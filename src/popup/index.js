import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Button from 'material-ui/Button';
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import withStyles from 'material-ui/styles/withStyles';

import Icon from 'material-ui/Icon';
import AddToPhotosIcon from 'material-ui-icons/AddToPhotos';
import IconButton from 'material-ui/IconButton';
import Modal from 'material-ui/Modal/Modal';
import Typography from 'material-ui/Typography/Typography';
import StyledModal from './styledModal'

import '../index.css';
import Workspace from './workspace'

import theme from './theme'

const styles = {
  root: {
    width: 530,
    height: 500,
    background: '#363537',
    color: '#fff'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
};

class Popup extends Component {

  constructor (props) {
    super(props)
  }

  onClick = () => {
    this.modal.handleOpen() // do stuff
  }
  

  createNewWS(name) {
     console.log('parent fct called - received', name)
  }
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={ theme }>
        <div style={ styles.root }>  
          <IconButton onClick={ this.onClick }>
            <AddToPhotosIcon/>
          </IconButton>

          <StyledModal
            callback={this.createNewWS}  
            onRef={ ref => (this.modal = ref) }
          />
        </div>  
      </MuiThemeProvider>  
    )
  }
}

export default Popup

const StyledPopup = withStyles(styles)(Popup);
ReactDOM.render(<StyledPopup />, document.getElementById('root'));
