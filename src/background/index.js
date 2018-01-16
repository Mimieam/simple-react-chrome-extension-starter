import { ChromeRPC } from '../utils'
import { GCWindows, GCTabs, helperAsyncTestFn } from './helpers'
export var backgroundApp = {
  getRuntimeId() {
    return chrome.runtime.id
  }
}

ChromeRPC.onMessage((request, sender, sendResponse) => {
  console.log(sender.tab ?
    'from a content script:' + sender.tab.url :
    'from the extension');
  console.log('got a message', request, sender, sendResponse)
  if (request.Message === 'hello')
  sendResponse({farewell: 'goodbye'});
}) 

chrome.storage.local.get('todos', (obj) => {
  let todos = obj.todos;
  if (todos) {
    todos = JSON.parse(todos);
    const len = todos.filter(todo => !todo.marked).length;
    if (len > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {  
    // Initial 
    console.log('Background.js loaded x 5')
    chrome.browserAction.setBadgeText({ text: '¬_¬' });
  } 
});



let windowId = 0;
const CONTEXT_MENU_ID = 'example_context_menu';

function closeIfExist() {
  if (windowId > 0) {
    chrome.windows.remove(windowId);
    windowId = chrome.windows.WINDOW_ID_NONE;
  }
} 

function popWindow(type) {
  closeIfExist();

  let _w = window.outerWidth / 3 
  let _h = window.outerHeight / 3 
 
  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: _w, 
    height: _h,
  };
  if (type === 'open') {
    options.url = 'popup.html';
    chrome.windows.create(options, (win) => {
      windowId = win.id;
    });
  }
}
// inspired from https://github.com/jhen0409/react-chrome-extension-boilerplate
chrome.contextMenus.create({
  id: CONTEXT_MENU_ID,
  title: 'React Chrome Extension Example',
  contexts: ['all'],
  documentUrlPatterns: [
    'https://github.com/*'
  ] 
});

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === CONTEXT_MENU_ID) {
    popWindow('open');
  }
});
// popWindow('open')

// const extUrl = `chrome-extension://${ chrome.runtime.id }/popup.html`
// console.log(extUrl)
// // chrome.windows.create({url:extUrl})

// // chrome.tabs.create({'url': chrome.extension.getURL('popup.html')}, function(tab) {
// // });
// // const findTabByUrl = async (_url) => {
  
// //   console.log(w)
// // }
// // findTabByUrl('localhost:3000')

// // helperAsyncTestFn()