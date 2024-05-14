import { JSDOM } from 'jsdom';


const normalizeURL = (inputUrl) => {
	console.log('here ---->', inputUrl)
	let parsedUrl = new URL(inputUrl);
	console.log('here ---->', parsedUrl);
	let urlToCheck = parsedUrl.host;
	if (parsedUrl.path) {
		urlToCheck + parsedUrl.path
	}
	if (urlToCheck[urlToCheck.length -1] == '/') {
		urlToCheck = urlToCheck.slice(0, -1)
	}
	/*
	if(urlToCheck.startsWith('https://') 
		urlToCheck = urlToCheck.replace('https://', '')
	else if(urlToCheck.startsWith('http://') 
		urlToCheck = urlToCheck.replace('http://', '')
	*/
	return urlToCheck 
}

const getURLsFromHTML = (htmlBody, baseURL) => {
	const dom = new JSDOM(htmlBody)
	const aTags = dom.window.document.querySelectorAll('a')
	let collectedURLs = new Array()
	for (aTag in aTags) {
		console.log(aTag)
	}
	return collectedURLs
}

export { normalizeURL };
