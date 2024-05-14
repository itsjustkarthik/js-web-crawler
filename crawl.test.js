import { test, expect } from "@jest/globals";

import { normalizeURL } from "./crawl.js";

describe('normalize url', () => {
	test('url test', () => {
		const testURL = 'https://itsjustkarthik.com/';
		const expectedURL = 'itsjustkarthik.com';
		expect(normalizeURL(testURL)).toBe(expectedURL);
	});
	
	test('url test', () => {
		const testURL = 'https://itsjustkarthik.com';
		const expectedURL = 'itsjustkarthik.com';
		expect(normalizeURL(testURL)).toBe(expectedURL);
	});

	test('url test', () => {
		const testURL = 'http://itsjustkarthik.com/';
		const expectedURL = 'itsjustkarthik.com';
		expect(normalizeURL(testURL)).toBe(expectedURL);
	});

	test('url test', () => {
		const testURL = 'http://itsjustkarthik.com';
		const expectedURL = 'itsjustkarthik.com';
		expect(normalizeURL(testURL)).toBe(expectedURL);
	});

	test('url test', () => {
		const testURL = 'http://itsjustkarthik.com/path1?a=a';
		const expectedURL = 'itsjustkarthik.com';
		expect(normalizeURL(testURL)).toBe(expectedURL);
	});
});
