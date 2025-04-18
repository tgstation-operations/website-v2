const fs = require("fs");
const path = require("path");
const shortcodes = require("./utils/shortcodes");
const yaml = require("js-yaml");
const { DateTime } = require("luxon");

function readDataFile(filename, fallback) {
  const primaryPath = path.join(__dirname, filename);
  const fallbackPath = path.join(__dirname, fallback);
  const filePath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;
  return yaml.load(fs.readFileSync(filePath, "utf-8"));
}

module.exports = async function (eleventyConfig) {
  const alertsData = readDataFile("alerts.yaml", "example-alerts.yaml");
  const serverData = readDataFile("servers.yaml", "example-servers.yaml");
  const navData = readDataFile("nav.yaml", "example-nav.yaml");
  const changelogData = yaml.load(fs.readFileSync("changelog.yaml", "utf-8"));
  eleventyConfig.addGlobalData("alerts", alertsData);
  eleventyConfig.addGlobalData("servers", serverData);
  eleventyConfig.addGlobalData("nav", navData);
  eleventyConfig.addGlobalData("changelog", changelogData);

  eleventyConfig.addNunjucksAsyncShortcode("webpack", shortcodes.webpack);
  eleventyConfig.addShortcode("currentBuildDate", () => {
    return new Date().toISOString();
  });
  eleventyConfig.addWatchTarget(
    path.join(__dirname, "_site/assets/manifest.yaml")
  );

  eleventyConfig.addWatchTarget(path.join(__dirname, "*.yaml"));

  const banners = [];

  fs.readdir(path.join(__dirname, "img/banners"), (err, files) => {
    files.forEach((file) => {
      banners.push(file);
    });
  });
  eleventyConfig.addGlobalData("banners", banners);
  eleventyConfig.addFilter("date", (dateObj) => {
    return DateTime.fromObject(dateObj, { zone: "utc" }).toFormat("MMMM yyyy");
  });
  return {
    dir: {
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
  };
};
