import { argv } from "node:process";
import { crawlPage, normalizeURL } from "./crawl.js";

function main() {
  let args = argv.slice(2);
  if (args.length > 1) {
    console.log("Too many arguments");
    return;
  }
  if (args.length < 1) {
    console.log("No input");
    return;
  }
  console.log("crawling the provided url: ", args[0]);
  crawlPage(args[0], args[0], {}).then((pages) => console.log(pages));
  // const pages = crawlPage(args[0], args[0], {});
  // console.log(pages);
}

main();
