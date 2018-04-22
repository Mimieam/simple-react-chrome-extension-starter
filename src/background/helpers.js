
export let GCWindows = {}
export let GCTabs = {}


// populate=true will return populate the tabs property of the window object
GCWindows.getLastFocused = async (populate=false) => {
 let w = await new Promise((resolve) => {
   return chrome.windows.getLastFocused({populate: populate}, t => resolve(t))
  })
  return w
}
GCWindows.getCurrent = async (populate = false) => {
 let w = await new Promise((resolve) => {
   return chrome.windows.getCurrent({populate: populate}, t => resolve(t))
  })
  return w
}

GCTabs._query = async (options) => {  
  let w = await new Promise((resolve) => {
    return chrome.tabs.query(options, t => resolve(t))
   }) 
   return w 
 }

GCTabs.queryByUrl = async (urlString) => {
  /**
   * returns an array of tabs matching the query
   * 
   * note - chrome.tabs.query will not match anything with a # in it
   */
  return await new Promise(async (resolve) => {
    const _url = urlString.split('#')[0]
    let t = await GCTabs._query({ url: _url })
    resolve(t)
  })
}

GCTabs.updateUrlAtTabId = async (tabId, urlStirng) => {
  return await chrome.tabs.update( tabId, {url: urlStirng, active: true} )
}

GCTabs.getLastActiveTabFromAGroupOfTabs =(tabs) => {
  //grab the last active Tab for that url if it exist or select the last tab returned by GCTabs.queryByUrl
  let lastActiveTab = tabs.filter(_t => { return _t.active })[0]
  lastActiveTab = lastActiveTab ? lastActiveTab : tabs.splice(-1)[0]
  return lastActiveTab
}



export const findAndLoadExtentionPageInNewBrowserTab = async (targetUrl) => {
  // chrome extension url
  console.log('opening - findAndLoadExtentionPageInNewBrowserTab ')
  const extUrl =  `chrome-extension://${chrome.runtime.id }/popup.html`
  
  // grab all tabs matching that target url
  const ext = await GCTabs.queryByUrl(extUrl)

  const tabs = await GCTabs.queryByUrl(`${ targetUrl }`) 

  console.log('tabs', tabs)

  let extUrlIsOpen = GCTabs.getLastActiveTabFromAGroupOfTabs(ext)

  if (extUrlIsOpen) {
    chrome.tabs.update(extUrlIsOpen.id, { active: true })
    console.log(extUrlIsOpen)
    return
  }
  console.log('exit point 2')
  let lastActiveTab = GCTabs.getLastActiveTabFromAGroupOfTabs(tabs)
  
  // update current tab or create a new one
  if (lastActiveTab) {
    console.log('exit point 3')
    await GCTabs.updateUrlAtTabId(lastActiveTab.id, extUrl)
  } else {
    console.log('exit point 4', tabs)
    // if (tabs.len <= 2) {
      await chrome.tabs.create({url:extUrl, active: true})
    // }
  }
}

export const helperAsyncTestFn = async () => {
  let w = await GCWindows.getLastFocused()
  console.log(w)
  let t = await GCTabs.queryByUrl('http://localhost:3000/')
  console.log(t)
 
  //grab the last active Tab for that url if it exist or select the last tab returned by GCTabs.queryByUrl
  let lastActiveTab = t.filter(_t => { return _t.active })[0]
  lastActiveTab = lastActiveTab ? lastActiveTab : t.splice(-1)[0]
  
  console.log('lastActiveTab', lastActiveTab)
  if (lastActiveTab) {
    await GCTabs.updateUrlAtTabId(lastActiveTab.id, `chrome-extension://${chrome.runtime.id }/popup.html`)
  } else {
    await chrome.tabs.create({url:`chrome-extension://${chrome.runtime.id }/popup.html`, active: true})
  }
  
}



