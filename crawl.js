import { JSDOM } from "jsdom";

const normalizeURL = (inputUrl, baseURL) => {
  let parsedUrl = new URL(inputUrl, baseURL);
  let urlToCheck = parsedUrl.host;
  // console.log("in normalizeURL", parsedUrl);
  if (parsedUrl.pathname) {
    // console.log("pathname:", parsedUrl.pathname);
    urlToCheck += parsedUrl.pathname;
  }
  if (urlToCheck[urlToCheck.length - 1] == "/") {
    urlToCheck = urlToCheck.slice(0, -1);
  }
  const parsedBaseURLDomain = new URL(baseURL);
  const baseURLDomain = parsedBaseURLDomain.host;
  // console.log("base domain", baseURLDomain);
  // console.log("domain", parsedUrl.host);
  if (baseURLDomain === parsedUrl.host) return `https://${urlToCheck}`;
  else return null;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
  // console.log("in get urls");
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");
  // console.log("aoea", aTags);
  let collectedURLs = new Array();
  aTags.forEach((aTag) => {
    // console.log("in here");
    let normalizedCurrentURL = normalizeURL(aTag.href, baseURL);
    if (normalizedCurrentURL !== null) {
      collectedURLs.push(normalizedCurrentURL);
    }
  });
  // console.log("collected", collectedURLs);
  return collectedURLs;
};

const fetchHTMLFromURL = async (currentURL) => {
  try {
    // console.log(`${currentURL}`);
    const response = await fetch(`${currentURL}`);
    // console.log("response", response.ok);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const contentType = response.headers.get("content-type");
    // console.log("content", contentType);
    if (contentType && contentType.includes("text/html")) {
      return { status: true, data: await response.text() };
    } else {
      throw new Error("Response is not HTML");
    }
  } catch (err) {
    console.log(currentURL);
    console.log("Error executing fetch: ", err);
    return { status: false };
  } finally {
  }
};

const crawlPage = async (baseURL, currentURL, pages = {}) => {
  const normalizedCurrentURL = normalizeURL(currentURL, baseURL);
  // console.log(currentURL);
  // console.log("aaa", normalizedCurrentURL);
  if (normalizedCurrentURL in pages) {
    // console.log("heree");
    pages[normalizedCurrentURL] += 1;
    console.log(normalizedCurrentURL, " already visited");
  } else if (normalizedCurrentURL !== null) {
    const response = await fetchHTMLFromURL(normalizedCurrentURL);
    if (response.status) {
      console.log("res", response.data);
      const currentPageHTML = response.data;
      console.log("crawled:", normalizedCurrentURL);
      const linksInPage = getURLsFromHTML(currentPageHTML, baseURL);
      pages[normalizedCurrentURL] = 1;
      for (let i = 0; i < linksInPage.length; i++) {
        crawlPage(baseURL, linksInPage[i], pages);
      }
    }
    return pages;
  }
  return pages;
};

export { normalizeURL, getURLsFromHTML, crawlPage };
