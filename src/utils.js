
export const ChromeRPC = {
  _getExtId: () => { 
    return chrome.runtime.id
  },
  sendMessage: (params, fn) => {
    chrome.runtime.sendMessage(chrome.runtime.id, params,fn);
  },
  onMessage: (MessageHandler) => {
    chrome.runtime.onMessage.addListener(MessageHandler);
  }
}


 



