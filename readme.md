# tgstation13.org
This is a rehash of the second(?) redesign with some more modern standards.

Under the hood, this site uses the Eleventy static site generator to convert our single(!) `index.njk` page to static HTML. Is this really necessary? Absolutely not, we can just as easily get by with static HTML.

Except, we also run `servers.json`,`alerts.json` and `nav.json` through eleventy as well, which generates the HTML for our base server banners, any alerts we have, and our navigation menu. This means we can set an alert or update the navigation menu with a simple commit. 

We're using the [Matcha](https://matcha.mizu.sh) CSS framework to handle frontend structure and styling. It's a lot smaller than Bootstrap.