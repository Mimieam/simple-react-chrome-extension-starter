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
    MuiIconButton: {
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
    MuiExpansionPanel: {
      root: {
        background: 'linear-gradient(45deg, #68F1F7 30%, #5DA2FB 90%)',
        borderRadius: 2,
        boxShadow: '0 3px 5px 2px rgba(73, 182, 228, .20)',
      }
    }
  },
});

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
  state = {
    modalOpen: false,
  };
  handleModalOpen = () => {
    this.setState({ modalOpen: true })


  }
  handleModalClose = () => { this.setState({ modalOpen: false }) }

  createNewWS() {
    
  }
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <IconButton onClick={ this.handleModalOpen.bind(this) }>
          <AddToPhotosIcon/>
        </IconButton>
        <StyledModal/>
      </MuiThemeProvider>  
    )
  }
}

export default Popup

const StyledPopup = withStyles(styles)(Popup);
ReactDOM.render(<StyledPopup />, document.getElementById('root'));
