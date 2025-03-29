const fs = require("fs");
const path = require("path");

module.exports = async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ img: "assets/img/" });
  eleventyConfig.addPassthroughCopy({ "src/js/": "assets/js/" });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@fortawesome/fontawesome-free/webfonts": "assets/webfonts/",
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@fontsource-variable/inconsolata/files": "assets/webfonts/",
  });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/@fontsource-variable/roboto/files": "assets/webfonts/",
  });
  const alertsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "alerts.json"), "utf-8")
  );
  const serverData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "servers.json"), "utf-8")
  );
  eleventyConfig.addGlobalData("alerts", alertsData);
  eleventyConfig.addGlobalData("servers", serverData);
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
