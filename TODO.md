Polyfill for construct stylesheets

We can use some css-in-js solution, but we're trying to keep dependencies at an absolute minimum



Progressively enhance the CSSStyleSheet (the one we use)
[Code](https://gist.github.com/jonikorpi/78070aab5e88d5e60e9c4c13ddde14c0) by [Joni Korpi](https://twitter.com/jonikorpi)

Can also be use with the [polyfill for constructable stylesheets](https://www.npmjs.com/package/construct-style-sheets-polyfill) by [Caleb Williams](https://twitter.com/calebwilliams12), but we're progressively enhancing it instead.

Then there's [this crazy trick](https://gist.github.com/developit/689aa4415bd688f3fce923cb8ae9abe7) using a service worker by [Jason Miller](https://twitter.com/_developit) to basically roll your own CSS Modules.

SystemJS is implementing some