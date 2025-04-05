const fs = require("fs");
const path = require("path");
const shortcodes = require("./utils/shortcodes");
const yaml = require("js-yaml");

module.exports = async function (eleventyConfig) {
  function readDataFile(filename, fallback) {
    const primaryPath = path.join(__dirname, filename);
    const fallbackPath = path.join(__dirname, fallback);
    const filePath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;
    return yaml.load(fs.readFileSync(filePath, "utf-8"));
  }

  const alertsData = readDataFile("alerts.yaml", "example-alerts.yaml");
  const serverData = readDataFile("servers.yaml", "example-servers.yaml");
  const navData = readDataFile("nav.yaml", "example-nav.yaml");
  const changelogData = yaml.load(fs.readFileSync("changelog.yaml", "utf-8"));
  // alertsData.forEach((alert) => {
  //   let validAlerts = ["danger", "warning", "info"];
  //   if (alert && !validAlerts.includes(alert.type)) {
  //     console.log(
  //       `CRITICAL ERROR: INVALID ALERT TYPE SPECIFIED: ${alert.type}`
  //     );
  //     return;
  //   }
  //   if (alert.type === "info") {
  //     alert.type = "accent";
  //   }
  //   if (alert.type === "warning") {
  //     alert.type = "severe";
  //   }
  // });
  eleventyConfig.addGlobalData("alerts", alertsData);
  eleventyConfig.addGlobalData("servers", serverData);
  eleventyConfig.addGlobalData("nav", navData);
  eleventyConfig.addGlobalData("changelog", changelogData);
  eleventyConfig.addNunjucksAsyncShortcode("webpack", shortcodes.webpack);
  eleventyConfig.addWatchTarget(
    path.join(__dirname, "_site/assets/manifest.yaml")
  );
  eleventyConfig.addWatchTarget(path.join(__dirname, "*.yaml"));
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
