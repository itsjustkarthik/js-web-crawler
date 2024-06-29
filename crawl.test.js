import { test, expect } from "@jest/globals";

import { normalizeURL, getURLsFromHTML } from "./crawl.js";

describe("normalize url tests", () => {
  test("tests for https://example.com/ format", () => {
    const testURL = "https://itsjustkarthik.com/";
    const expectedURL = "itsjustkarthik.com";
    expect(normalizeURL(testURL)).toBe(expectedURL);
  });

  test("tests for https://example.com format", () => {
    const testURL = "https://itsjustkarthik.com";
    const expectedURL = "itsjustkarthik.com";
    expect(normalizeURL(testURL)).toBe(expectedURL);
  });

  test("tests for http://example.com/ format", () => {
    const testURL = "http://itsjustkarthik.com/";
    const expectedURL = "itsjustkarthik.com";
    expect(normalizeURL(testURL)).toBe(expectedURL);
  });

  test("tests for http://example.com format", () => {
    const testURL = "http://itsjustkarthik.com";
    const expectedURL = "itsjustkarthik.com";
    expect(normalizeURL(testURL)).toBe(expectedURL);
  });

  test("tests for http://example.com/sample_path?query=sample", () => {
    const testURL = "http://itsjustkarthik.com/path1?a=a";
    const expectedURL = "itsjustkarthik.com/path1";
    expect(normalizeURL(testURL)).toBe(expectedURL);
  });
});

describe("crawl URL", () => {
  test("external url", () => {
    const htmlBodySample = `
			<body>
				<div>
					<h1>Example Domain</h1>
					<p>This domain is for use in illustrative examples in documents. You may use this
					domain in literature without prior coordination or asking for permission.</p>
					<p><a href="https://www.iana.org/domains/example/">More information...</a></p>
				</div>
			</body>`;
    const baseURL = "https://example.com/";
    let collectedURLs = getURLsFromHTML(htmlBodySample, baseURL);
    const expectedCollectedURLs = ["www.iana.org/domains/example"];

    expect(collectedURLs.sort()).toEqual(expectedCollectedURLs.sort());
  });

  test("absolute url", () => {
    const htmlBodySample = `
			<body>
				<div>
					<h1>Example Domain</h1>
					<p>This domain is for use in illustrative examples in documents. You may use this
					domain in literature without prior coordination or asking for permission.</p>
					<p><a href="https://www.example.com/domains/example/">More information...</a></p>
				</div>
			</body>`;
    const baseURL = "https://example.com/";
    let collectedURLs = getURLsFromHTML(htmlBodySample, baseURL);
    const expectedCollectedURLs = ["www.example.com/domains/example"];
    console.log("here", expectedCollectedURLs);
    expect(collectedURLs.sort()).toEqual(expectedCollectedURLs.sort());
  });

  test("relative url", () => {
    const htmlBodySample = `
			<body>
				<div>
					<h1>Example Domain</h1>
					<p>This domain is for use in illustrative examples in documents. You may use this
					domain in literature without prior coordination or asking for permission.</p>
					<p><a href="/domains/example/">More information...</a></p>
				</div>
			</body>`;
    const baseURL = "https://www.example.com/";
    let collectedURLs = getURLsFromHTML(htmlBodySample, baseURL);
    const expectedCollectedURLs = ["www.example.com/domains/example"];
    console.log("here", expectedCollectedURLs);
    expect(collectedURLs.sort()).toEqual(expectedCollectedURLs.sort());
  });
});
