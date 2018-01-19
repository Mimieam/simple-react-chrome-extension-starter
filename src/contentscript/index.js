console.log('Execute content script')

console.log(chrome.runtime.id)
// document.body.innerHTML = `<h1> Loading Extension (${ chrome.runtime.id })... </h1>`


// console.log(chrome.extension.getURL('popup.html'))
const extUrl = `chrome-extension://${ chrome.runtime.id }/popup.html`
// console.log(extUrl) 

document.body.innerHTML = `<h1> Loading Extension click <a href="${extUrl}"> Here </a>... </h1>`
setTimeout(async () => {
  await chrome.runtime.sendMessage(chrome.runtime.id, {Message: 'openExt'}, (response) => { 
    console.log(response)
  })
}, 1000);
// chrome.windows.create({url:extUrl})
// window.open(extUrl)
