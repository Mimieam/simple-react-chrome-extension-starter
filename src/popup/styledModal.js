import React, { Component } from 'react'
import Modal from 'material-ui/Modal/Modal';
import Typography from 'material-ui/Typography/Typography';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button/Button';
import TextField from 'material-ui/TextField/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme'
import IconButton from 'material-ui/IconButton/IconButton';

const styles = {
  modalWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    position: 'inherit',
    width: theme.spacing.unit * 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    padding: theme.spacing.unit * 4,
    '&:focus': {
      outline: 'rgba(255, 105, 135, .30) auto 5px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
    },
    '> *': {
      padding: '5px',
      background:'purple'
    }
    
  },
};

class StyledModal extends Component {
  state = {
    open: false,
  };
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={ theme }>
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={ this.state.open }
        onClose={ this.handleClose }
        className={ classes.modalWrapper}
      >
        <div className={ classes.paper }>
          
          <Typography variant="title" id="modal-title">
            Enter a Name Please :)
          </Typography>
          <TextField
            id="newWSInput"
            placeholder="New Workspace"
            // className={classes.textField}
            helperText="All the tabs open in the current Window will become part of the new Workspace"
            />
            <IconButton onClick={ () => {
              console.log('IconButton clicked')
              const newWSName = document.querySelector('#newWSInput').value // get name
              this.props.callback(newWSName) // handle it
              document.querySelector('#newWSInput').value = '' // reset input
              this.handleClose()
            } }> 
            Save
            </IconButton>
            <Button onClick={ () => { 
              this.handleClose()
            } }>
              Cancel  
            </Button>
        </div>
        </Modal>
        </MuiThemeProvider>  
    )
  }
}


export default withStyles(styles)(StyledModal)