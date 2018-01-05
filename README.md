# Simple React Chrome Extension Starter

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
  