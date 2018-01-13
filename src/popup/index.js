import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../index.css';


import { ChromeRPC } from '../utils';

// import { backgroundApp } from '../background/index';

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

ChromeRPC.sendMessage({ Message: 'hello' }, () => { 'greeting sent from popup'})

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

  render () {
    return (
      <div style={styles.mainContent}>
        WOrkSpace Popup
        <input type='button' value='WorkSpace 2' onClick={this.clickHandler.bind(this)}/>
      </div>
    )
  }
}


ReactDOM.render(<Popup />, document.getElementById('root'));
