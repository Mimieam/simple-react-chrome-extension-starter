import React, { Component } from 'react'
import Modal from 'material-ui/Modal/Modal';
import Typography from 'material-ui/Typography/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root: {
    width: 530,
    height: 500,
    background: '#363537',
    color: '#fff'
  },
};

class StyledModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;

    return (
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div className={ classes.paper }>
          
          <Typography variant="title" id="modal-title">
            Text in a modal
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </div>
      </Modal>
    )
  }
}


export default withStyles(styles)(StyledModal)