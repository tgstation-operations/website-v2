const fs = require("fs");
const path = require("path");
const shortcodes = require("./utils/shortcodes");
module.exports = async function (eleventyConfig) {
  function readJsonFile(filename, fallback) {
    const primaryPath = path.join(__dirname, filename);
    const fallbackPath = path.join(__dirname, fallback);
    const filePath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  const alertsData = readJsonFile("alerts.json", "example-alerts.json");
  const serverData = readJsonFile("servers.json", "example-servers.json");
  const navData = readJsonFile("nav.json", "example-nav.json");

  alertsData.forEach((alert) => {
    let validAlerts = ["danger", "warning", "info"];
    if (alert && !validAlerts.includes(alert.type)) {
      console.log(
        `CRITICAL ERROR: INVALID ALERT TYPE SPECIFIED: ${alert.type}`
      );
      return;
    }
    if (alert.type === "info") {
      alert.type = "accent";
    }
    if (alert.type === "warning") {
      alert.type = "severe";
    }
  });
  eleventyConfig.addGlobalData("alerts", alertsData);
  eleventyConfig.addGlobalData("servers", serverData);
  eleventyConfig.addGlobalData("nav", navData);
  eleventyConfig.addNunjucksAsyncShortcode("webpack", shortcodes.webpack);
  eleventyConfig.addWatchTarget(
    path.join(__dirname, "_site/assets/manifest.json")
  );
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
