# tgstation13.org

## HEADS UP!!! BRANCHES WERE RENAMED!!!
The new default branch here is `main`. The previous website code was moved to the `legacy` branch.

This is a rehash of the second(?) redesign with some more modern standards.

Under the hood, this site uses the Eleventy static site generator to convert our single(!) `index.njk` page to static HTML. Is this really necessary? Absolutely not, we can just as easily get by with static HTML.

Except we also run `servers.yaml`,`alerts.yaml` and `nav.yaml` through eleventy as well, which generates the HTML for our base server banners, any alerts we have, and our navigation menu. This means we can set an alert or update the navigation menu with a simple commit, without the client having to wrangle a bunch of ~~json~~ yaml.

We're using the [Matcha](https://matcha.mizu.sh) CSS framework to handle frontend structure and styling. It's a lot smaller than Bootstrap.

## Getting Started

Out of the box, `example-alerts.yaml`, `example-nav.yaml`, and `example-servers.yaml` are set up with some example data to get you started.

### `alerts.yaml`
Alerts under their corresponding keys will be placed on the site between the logo and the "What is Space Station 13" section. If you don't have any alerts, you can comment out the data under the keys.

### `nav.yaml`
This file controls the site navigation menu at the top of the page. See `example-nav.yaml` for an example of how this data should be structured.

### `servers.yaml`
This populates the initial static server banners on the homepage. The `identifier` key on server objects is important: `gamebanners.js` will update any banner that has a matching identifier from the `serverinfo.json` response. _If you want a server to appear on the homepage, it must be listed in this file first._

### Banners 
Any image placed in `src/img/banners` will be picked up by eleventy at buildtime and added to a list of banners, one of which will be picked at random on page load. Images should be 728 by 90 pixels. A grey "loading" banner will be visible if an image cannot be loaded for whatever reason.

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

### Clean Build
Run a clean build with docker:
`docker run -it -v $(pwd):/app -w /app node:latest npm run build`

### `changelog.yaml`
This file is nominally for tracking changes made to the site files. The top `version` value is pulled into the site footer at build time.


## Newsletters! 
We also use eleventy to generate the newsletter archive. Newsletters should be written in markdown, and require the following frontmatter(metadata):

```markdown
---
title: <Title of the newsletter>
date: <Must be formatted YYYY-MM-DD>
layout: layout.njk
tags: newsletter
---
```
The `layout` and `tags` keys are required and must not be changed.

## TODO
- ~~Dismissible sections & alerts ~~
- ~~Pause space option~~
- ~~Convert/support yaml for alerts & nav (allows for stuff to be commented out)~~
- Shift+click to join rounds
- Remove unneeded dependencies
- ~~GitHub Actions~~

## Known Issues
- About a billion edge-cases in terms of what `serverinfo.json` returns
- When using the dev server, `index.njk` will render without CSS until you save `index.njk` and force eleventy to re-render it.