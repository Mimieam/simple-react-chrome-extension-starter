import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../index.css';


/*
Yes you can directly call make calls from the popup to the background functionalities 
like this 

import { backgroundFctTest } from '../background/index';
backgroundFctTest('Popup')

however this is a bad idea, for starter the chrome background APIs will be undefined so your 
localhost:3000 will error out if u try to open as a regular webpage (which is great when you are styling the app).
Your chrome ext will still be fine because it knows the APIs 
but your Dev experience will just be poor for very little gains

use :

chrome.runtime functions

*/


console.log('popup LOADED x6 ')

const styles = {
  mainContent: {
    height: 300,
    width: 200,
    background: '#222222',
    color: '#fff'
  }
}

class Popup extends Component {
  clickHandler() {
    console.log('ACTIONS = *Button clicked*')
    // console.log(backgroundFctTest('Popup'))
  }
  render () {
    return (
      <div style={styles.mainContent}>
        WOrkSpace Popup
        <input type='button' value='WorkSpace 1' onClick={this.clickHandler.bind(this)}/>
      </div>
    )
  }
}


// export default Popup

ReactDOM.render(<Popup />, document.getElementById('root'));
