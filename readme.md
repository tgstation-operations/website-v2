# tgstation13.org
This is a rehash of the second(?) redesign with some more modern standards.

Under the hood, this site uses the Eleventy static site generator to convert our single(!) `index.njk` page to static HTML. Is this really necessary? Absolutely not, we can just as easily get by with static HTML.

Except, we also run `servers.json`,`alerts.json` and `nav.json` through eleventy as well, which generates the HTML for our base server banners, any alerts we have, and our navigation menu. This means we can set an alert or update the navigation menu with a simple commit. 

We're using the [Matcha](https://matcha.mizu.sh) CSS framework to handle frontend structure and styling. It's a lot smaller than Bootstrap.

## Getting Started

Out of the box, `example-alerts.json`, `example-nav.json`, and `example-servers.json` are set up with some example data to get you started.

### `alerts.json`
Any objects in this file will be converted to alert banners at the top of the website, between the logo and the "What is SS13" section. Valid alert `type`s are: `info`, `warning`, and `danger`. If you don't have any alerts, you can drop an empty array (`[]`) in `alerts.json`. 

### `nav.json`
This file controls the site navigation menu at the top of the page. See `example-nav.json` for an example of how this data should be structured.

### `servers.json`
This populates the initial static server banners on the homepage. The `identifier` key on server objects is important: `gamebanners.js` will update any banner that has a matching identifier from the `serverinfo.json` response. _If you want a server to appear on the homepage, it must be listed in this file first._

## Building

Install dependencies with your package manager of choice. I use `yarn`: 

```shell
yarn install
```

and start the dev server: 

```shell
yarn run start
```

and build the final site:

```shell
yarn run build
```

The final site files will be in `_site`.

## TODO
- Dismissible sections & alerts 
- Pause space option
- Convert/support yaml for alerts & nav (allows for stuff to be commented out)
- Remove unneeded dependencies
- GitHub Actions

## Known Issues
- About a billion edge-cases in terms of what `serverinfo.json` returns