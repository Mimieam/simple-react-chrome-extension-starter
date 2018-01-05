# Simple React Chrome Extension Starter


### Why?
  The Yeoman [generator-chrome-extension](https://github.com/yeoman/generator-chrome-extension) is simple and great! If you dont need React I definitely recommend it. 
  
  That being said I wanted to use React, I found many boilerplate but they were either too complex, had too many redundancies in the build processe ( building popup, background, etc.. as separate apps) or a non-intuitive file structure.


### How ?
  This Repo is simply an ejected [CRA](https://github.com/facebookincubator/create-react-app) with the slightly modified Yeoman generated chrome extension inside the *public* and some glue in between.

```
├── public
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
│       └── media
│           ├── icon-128.png
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
├── webpack.config.js
```

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
  


- configure eslint to not crash when encountering chrome references our code - add this to package.json 
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

  TODO:
    - config hot reload
    - add write-file-webpack-plugin -> write to a dev/temp folder
    - enable reload of chrome app extension
    - remove obsolete files
    

  Inspired by:
  - https://github.com/yeoman/generator-chrome-extension 
  - https://github.com/jhen0409/react-chrome-extension-boilerplate 
  