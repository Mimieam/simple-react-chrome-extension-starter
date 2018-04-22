# Simple React Chrome Extension Starter


### Why?

The Yeoman [generator-chrome-extension](https://github.com/yeoman/generator-chrome-extension) is simple and great! If you don't need React I definitely recommend it.

That being said I wanted to use React, I found many boilerplate but they were either too complex( lot of extra stuff ), had too many redundancies in the build process ( building popup, background, etc.. as separate apps) or a non-intuitive file structure. 
So after a 3 days of frustration I decided to just make a simple boilerplate :)

### How does it works?

This Repo is simply an ejected [CRA](https://github.com/facebookincubator/create-react-app) with the slightly modified Yeoman generated chrome extension inside the *public* and some glue in between.

#### -> Production

The production build process is fairly straight forward and pretty much works out of the box - the **build** folder is then loaded as an Unpacked Extension in Chrome
Run `Yarn build`

#### -> Development

In Dev mode, the chrome extension will be loading file from the **Webpack-dev-server** at localhost:3000 - If you see nothing displayed that would most likely be because of the server isn't running.
Load the **public** folder as an unpacked Extension

Please manually reload the app if you modify one of the **manisfest.json** 

#### -> Packaging

 ```javascript
yarn build
yarn keygen  // create the key.pem file
yarn compress  // compress for production (output both .zip and .crx)
yarn compress  --addversion //compress with version in name
```
>> Note I believe the release folder should not be tracked via git because the zip and crx contain your generated key.pem

#### Folder Structure

```
├── build/
├── config/
├── node_modules/
├── public                         --> Point to this when loading the Unpacked from chrome during development
│   ├── _locales
│   │   └── en
│   │       └── messages.json       --> Modify this
│   ├── favicon.ico                 --> not needed but still good to have
│   ├── manifest.json
│   ├── manifest.prod.json
│   ├── popup.html
│   ├── options.html
│   ├── background.html             --> do not modify this 
│   └── static
│       └── media                   --> all the assets 
│           ├── icon-128.png        --> the extension icons 
│           ├── icon-16.png
│           ├── icon-19.png
│           └── icon-38.png
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── background
│   │   └── index.js
│   ├── contentscript
│   │   └── index.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── options
│   │   └── index.js
│   ├── popup
│   │   └── index.js
│   │

```





TODO:
- <s>config hot reload</s>
- <s>add write-file-webpack-plugin -> write to a dev/temp folder </s>
- <s>enable reload of chrome app extension</s>
- remove obsolete files
- <s> fully integrate contentScript </s>
- fully integrate option 
  

  Inspired by:
  - https://github.com/yeoman/generator-chrome-extension 
  - https://github.com/jhen0409/react-chrome-extension-boilerplate 
  


<hr/>

## personal notes on how i made this 
- create regular react app
- eject app
- install copy-webpack-plugin' from npm 

- add an app & a background entry to the webpack.config files
- add the copywebpackplugin at the end of list of plugins

```
new CopyWebpackPlugin([
      { from: 'public/static' }
    ]),
```


- update the public/manifest.json file
    - watchout for where you put icons - static/media/

- create your Yeoman Chrome extension inside /public/temp

- create 2 folders : options and popup
- clone the content of the CRA public/index.html in 2 new files in the public folders: options.html, popup.html
  - the injected bundle file for each will be manually added here - we could mess with the webpack.configs some more but for simplicity sake we wont
  


- configure eslint to not crash when encountering *chrome* references in our code - add this to package.json 
```
  "eslintConfig": {
    "extends": "react-app",
    "env": {
      "node": true,
      "browser": true
    },
    "globals": {
      "chrome": true
    },
    "rules": {
      "eol-last": 0,
      "quotes": [
        2,
        "single"
      ]
    }
  } 
  ```


```registerServiceWorker.js``` is to be use solely during development, see CRA page


```/**
 * This chrome Extension is setup with 2 entry points 
 * the FrontEnd  in src/popup/index.js
 * and the BackEnd in src/backgound/index.js
 */
 ```
 .babelrc seems to get overriden when running yarn ... not sure why... i didn't mofified anything in regard to babel except adding the runtime plugin. I blame the ejected CRA for that :P  
```

{
  "presets": [
    "env",
    "react",
    "stage-0"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-decorators",
    "transform-react-constant-elements",
    "transform-react-inline-elements",
    "transform-runtime"
  ]
}
```

https://developer.chrome.com/extensions/manifest#web_accessible_resources

### Contentscript not updating??

In dev mode, when **contentscript** is update - the entire chrome app needs to be reloaded or the old version would still be used. I believe it's because the dev mode Manifest.json is referencing contentscript.bundle.js directly and once loaded chrome will cache this.
A solutions:
  -  inject it within the iframe, but it looked very ugly to me.
  - chrome.runtime.reload() ... this needs further investigation to avoid reload loops in dev mode...
  - use web_accessible_resources and change ["contentscript.bundle.js"] in manifest.json to some kind of contentScriptDevInjector.js script (to be placed under public/) that would inject an html web ressource into the page... crap this is the ifram biz again hmm.. oh well.. will try that later - so in theory each time the app is open.. it should pull the web_ressource and therefore get the latest content script. This would be a dev hack and shouldn't go in the production manifest
```javascript
// in manifest.json 
"content_scripts": [
  {
    "matches":["http://localhost:3000/*"],
    "js":["contentScriptDevInjector.js"]
  }
],

"web_accessible_resources": [
    ...,
    "contentscript.html",
],

//contentscript.html - not sure yet if contentscript.bundle.js would be available like this but i think this shoudl work...
<script src="http://localhost:3000/contentscript.bundle.js"></script>

// contentScriptDevInjector.js
var iframe  = document.createElement ('iframe');
iframe.src  = chrome.extension.getURL ('contentscript.html');
document.body.appendChild (iframe);

```
Anyway long story short for now when anything under contentscript/ is modified the app needs to be manually reloaded in chrome via the extension manager page.