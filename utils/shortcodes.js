const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(__dirname, "../_site/assets/manifest.json");

module.exports = {
  webpack: async (name) =>
    new Promise((resolve) => {
      fs.readFile(manifestPath, { encoding: "utf8" }, (err, data) =>
        resolve(err ? `/assets/${name}` : JSON.parse(data)[name])
      );
    }),
};
