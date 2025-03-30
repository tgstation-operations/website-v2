const fs = require("fs");
const path = require("path");
const shortcodes = require("./utils/shortcodes");
module.exports = async function (eleventyConfig) {
  const alertsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "alerts.json"), "utf-8")
  );
  const serverData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "servers.json"), "utf-8")
  );
  eleventyConfig.addGlobalData("alerts", alertsData);
  eleventyConfig.addGlobalData("servers", serverData);
  eleventyConfig.addNunjucksAsyncShortcode("webpack", shortcodes.webpack);
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
