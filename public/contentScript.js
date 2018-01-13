console.log(chrome.runtime.id)
console.log(chrome)
document.body.innerHTML = "<h1> Extension Loaded... </h1>"


console.log(chrome.extension.getURL('popup.html'))
const extUrl = `chrome-extension://${ chrome.runtime.id }/popup.html`
// console.log(extUrl)
// chrome.windows.create(extUrl)
