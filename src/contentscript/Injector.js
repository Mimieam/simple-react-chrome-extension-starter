// import { GCTabs } from '../background/helpers';

// console.log('Execute content script 9')
// console.log(chrome.runtime.id)

const extUrl = `chrome-extension://${ chrome.runtime.id }/popup.html`
// console.log(extUrl) 
let devModeContent = `
<div>
  YoT! This page is simply a nice convenience when styling an app - 
  It is however your app functionality would be limitated since we are opening 
  in a tab browser with limited access to the Chrome API. 
  <br/> 
  That being said you should be redirected to your API in a few...
  If nothing happens...
  or navigate to <h3> ${extUrl} </h3>
</div>  
`
console.log(devModeContent)
document.body.innerHTML = devModeContent

export const devOnlyReload = () => {
  setTimeout(async () => {
  // await reloadContentScript()
    await chrome.runtime.sendMessage(chrome.runtime.id, {Message: 'openExt'}, (response) => { 
      console.log('openExt res =', response)
    })
  }, 1000);
}
