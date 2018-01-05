

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
    chrome.browserAction.setBadgeText({ text: '1' });
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

  let _w = window.outerWidth / 2 - window.outerWidth /5
  let _h = window.outerHeight / 2 - window.outerHeight /5
 
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
