import { GCTabs } from '../background/helpers';

const reloadContentScript = async () => {
  const _tab = await GCTabs.queryByUrl('localhost:3000')
  chrome.tabs.executeScript(_tab, {file: '../../public/contentscript.bundle.js'});

}

reloadContentScript()

console.log('Execute content script V4')

console.log(chrome.runtime.id)

const extUrl = `chrome-extension://${ chrome.runtime.id }/popup.html`
// console.log(extUrl) 

document.body.innerHTML = `<h1> Loading Extension 2 click <a href='#' onclick='chrome.tabs.create({url:'${extUrl}a'})'> Here </a>... </h1>`
// document.body.innerHTML = '<h1>nothing 2here </h1>'
setTimeout(async () => {
  await chrome.runtime.sendMessage(chrome.runtime.id, {Message: 'openExt'}, (response) => { 
    console.log('openExt res =', response)
  })
}, 1000);
// chrome.windows.create({url:extUrl})
// window.open(extUrl)

