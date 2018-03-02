import { GCWindows } from './helpers';
import { stringifyAndCompress, decompressAndParse} from '../background/save';

export class WorkSpaceManager {

  constructor(name='ws') {
    // an array of workspace name
    this.name = 'somanytabs_' + name
    this.wsArr = this.loadWorkSpace() || [] 
    console.log('All Workspaces', this.wsArr)
    this.count = this.wsArr.length
  }

  loadWorkSpace(){ 
    console.log('loading WS')
    let ws = localStorage.getItem(this.name)
    if (ws) return JSON.parse(ws)
    return []
  }

  addWorkSpace(name, wsStr) { 
    //wsStr = stringified and compressed ws data
    const arr = [name].concat(this.wsArr) 
    this.wsArr = Array.from(new Set(arr)) // deduplicate 
    this.count = this.wsArr.length
    localStorage.setItem(name, wsStr)
    this.saveWorkSpace()
  }
  listAllWorkSpace() {
    const allWS = this.wsArr
    return allWS
  }
  openAWorkSpace(wsName) {
    if (wsName in this.wsArr) {
      localStorage.getItem(wsName)
    }
  }
  /**
   * returns a promise of an array of workspaces like so
   * [{
      name: name,
      tabs: compressedTabs
    }]
   */
  async getAllWorkSpace() { 
    const allWS = this.wsArr.map(async (wsName) => {
    
      const compressed = await localStorage.getItem(wsName)
      const formatted = await compressed ? decompressAndParse(compressed, true) : []
      return {
        name: wsName,
        tabs: formatted
      }  
    })
    const ws = await Promise.all(allWS)
    return ws
  }  

  removeWorkSpace(nameToBeDeleted) { 
    this.wsArr = this.wsArr.filter(n => n !== nameToBeDeleted)  
    this.count = this.wsArr.length
    localStorage.removeItem(nameToBeDeleted)
    this.saveWorkSpace()
  }

  saveWorkSpace() { 
    localStorage.setItem(this.name, JSON.stringify(this.wsArr))
  }

  deleteAllWorkSpace() {
    const allWS = this.wsArr
    allWS.map(ws => localStorage.removeItem(ws))
    this.wsArr = []
    this.count = 0
    localStorage.removeItem(this.name)
  }
  pop() {
    // remove the last item added - for the recursive focus
    const wskey = this.wsArr[0]
    const ws = localStorage.getItem(wskey)
    this.removeWorkSpace(wskey)
    this.saveWorkSpace()
    return ws
  }
  
}

export const WSM = new WorkSpaceManager('ws') // workspace manager - workspace are longterms spaces 
console.log(WSM)

export const saveCurrentWindow = async (name) => {

    const currentWindow = await GCWindows.getLastFocused(true)
    const formatted = currentWindow.tabs.map(t => {
      return {
        // icon: t.favIconUrl || '',
        title: t.title || '',
        url: t.url
      }
    })
    const cw = {
        name: name,
        tabs: formatted
    }
    console.log(cw)
    const compressedWindow = stringifyAndCompress(formatted)  
    console.log(compressedWindow)
    const cw_name = name ||`ws_${WSM.count}`

    WSM.addWorkSpace(cw_name, compressedWindow)

}
// export const Focus = async (currentOnly) => {
//   chrome.windows.getAll((windows) => {
//     const fn = [GCWindows.getLastFocused()]
//     fn.then((arrayOfPromises) => {
//       const p = Promise.all(arrayOfPromises) // arrayOfPromised window
//       return p
//     }).then((arr) => {
//       console.log(arr)  // array or resolved windows with tabs
//       const allTabsGroupedByWindows = arr.map(w => { 
//         return w.tabs.map(t => {
//           return {
//             icon: t.favIconUrl || "",
//             title: t.title || "",
//             url: t.url
//           }
//         })
//       })
//       const allWindowsIds = arr.map(w => { 
//         return w.windowId
//       })
//       // returns the tabs to be compressed and the ids of windows to close
//         return [allTabsGroupedByWindows, allWindowsIds]
//       }).then((arr) => {
//         console.log(arr)
//         const allWindowsIds = arr[1]
//         const compressedWindows = _stringifyAndCompress(arr[0])  
//         console.log(compressedWindows)
//         WSM.addWorkSpace('focus_' + WSM.count, compressedWindows)
        
//         //create a blank window
//         // chrome.windows.create({ url: "about:blank" }, () => { console.log('done') })
        
//         //Merciless killing of those windows!!
//         // allWindowsIds.map(wId => chrome.windows.remove(wId, (d) => { console.log("Done removing", wId) }))

     
//     })
// }


// // export default WSM