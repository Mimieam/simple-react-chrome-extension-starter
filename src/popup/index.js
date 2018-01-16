import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../index.css';
import { ChromeRPC,  } from '../utils';
import { findAndLoadExtentionPageInNewBrowserTab } from '../background/helpers';
console.log('env', process.env.NODE_ENV)
/*
Yes you can directly call make calls from the popup to the background functionalities 
like this 

backgroundFctTest('Popup')

however this is a bad idea, for starter the chrome background APIs will be undefined so your 
localhost:3000 will error out if u try to open as a regular webpage (which is great when you are styling the app).
Your chrome ext will still be fine because it knows the APIs 
but your Dev experience will just be poor for very little gains

use :

chrome.runtime functions
*/



ChromeRPC.sendMessage({ Message: 'hello' }, (response) => { console.log('response received:', response)})

console.log('popup LOADED x6 ', chrome.runtime.id)

const styles = {
  mainContent: {
    height: 500,
    width: 500,
    background: '#222222',
    color: '#fff'
  }
}

class Popup extends Component {

  getBackgroundPage() {
    const bgJS = chrome.extension.getBackgroundPage()
    console.log(bgJS)
  }

  clickHandler() {

    console.log('ACTIONS = *Button clicked*')
    this.getBackgroundPage()
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      findAndLoadExtentionPageInNewBrowserTab('http://localhost:3000/')
    }

  }


  render () {
    return (
      <div style={styles.mainContent}>
        WOrkSpace Popup
        {`chrome-extension://${ chrome.runtime.id }/popup.html`}
        <input type='button' value='WorkSpace 5' onClick={this.clickHandler.bind(this)}/>
      </div>
    )
  }
}


ReactDOM.render(<Popup />, document.getElementById('root'));
