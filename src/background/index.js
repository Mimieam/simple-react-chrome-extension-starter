import {
  GCTabs,
  GCWindows,
  helperAsyncTestFn,
  findAndLoadExtentionPageInNewBrowserTab
} from './helpers'

import { ChromeRPC } from '../utils'
import { contextMenuObject, onClickContextMenuHandler } from './contextMenu';

import { WSM } from './WorkspaceManager';

ChromeRPC.onMessage((request, sender, sendResponse) => {
  // console.log('got a message', request, sender)
  console.log(sender.tab ?
    'from a content script:' + sender.tab.url :
    'from the extension');
  switch (request.Message) {
    case 'hello':
      sendResponse({farewell: 'goodbye'});
      break;
    case 'openExt':
      // if (process.env.NODE_ENV === 'development') {
      findAndLoadExtentionPageInNewBrowserTab ('http://localhost:3000/')
      // }
      sendResponse({Message: 'opening Chrome Ext'}); 
      break;
    default:
      break;
  }
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
    console.log('-> Background.js loaded')
    chrome.browserAction.setBadgeText({ text: '¬_¬' });
  } 
});

  
chrome.runtime.onInstalled.addListener(() => {
 chrome.contextMenus.create(contextMenuObject);
})

chrome.contextMenus.onClicked.addListener(onClickContextMenuHandler);
