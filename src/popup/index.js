import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ChromeRPC } from '../utils';

import '../index.css';


import Button from 'material-ui/Button';
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: indigo,
    secondary: pink,
    error: {
      main: red[500],
    },
  },
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

// function Popup() {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <Button>Overrides</Button>
//     </MuiThemeProvider>
//   );
// }


// import React, { Component } from 'react'
// import ReactDOM from 'react-dom';





const styles = {
  mainContent: {
    height: 500,
    width: 500,
    background: '#363537',
    color: '#fff'
  }
}

class Popup extends Component {

  getBackgroundPage() { }

  clickHandler() {
    
    this.getBackgroundPage()
  }

  componentDidMount() { }


  render () {
    return (
        <MuiThemeProvider theme={theme}>
      <div style={ styles.mainContent }>
          <Button onClick={this.clickHandler.bind(this)} >Overrides</Button>
        CHROME EXT URL = 
        <h1>{`chrome-extension://${ chrome.runtime.id }/popup.html`} </h1>
        <input type='button' value='WorkSpace 5' onClick={this.clickHandler.bind(this)}/>
          <Button>Overrides</Button>
      </div>
        </MuiThemeProvider>  
    )
  }
}


ReactDOM.render(<Popup />, document.getElementById('root'));
