console.log('Execute content script')

console.log(chrome.runtime.id)
document.body.innerHTML = `<h1> Loading Extension (${ chrome.runtime.id })... </h1>`


// console.log(chrome.extension.getURL('popup.html'))
const extUrl = `chrome-extension://${ chrome.runtime.id }/popup.html2`
console.log(extUrl) 
  
// chrome.windows.create(extUrl)
