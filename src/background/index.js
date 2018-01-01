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
  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 1800,
    height: 475,
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
