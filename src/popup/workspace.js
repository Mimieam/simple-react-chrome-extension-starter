import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';

import Snackbar from 'material-ui/Snackbar';

import { styles } from './index';

/** 
 * short press - click - opens the workspace
 * long Press - hold down - opens a snacksbar with options
*/
class WorkspaceButton extends Component {
  state = {
    longPressed: false
  }
  
  handleButtonPress = (e) => {
    this.buttonPressTimer = setTimeout(() => {
      this.setState({ longPressed: true })
      this._handleOnHold(e)
    }, 1000);
  }
  
  handleButtonRelease = async (e) => {
    clearTimeout(this.buttonPressTimer)
  }
  
  handleOnClick = async (e) => {
    if (this.state.longPressed===false) {
      this._handleOnClick()
    }
    await this.setState({ longPressed: false })
  }

  _handleOnClick = (e) => {
    console.log(this.props.name)
  }

  _handleOnHold = (e) => {
    console.log('Executes code after holding for 1sec', this.props.name)
    console.log(this.props.urls)
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="raised" color="primary" className={ classes.button }
          data-name={ this.props.name }
          onClick={ ()=> this.handleOnClick() }
          onMouseDown={ (e) => this.handleButtonPress(e) }
          onMouseUp={ () => this.handleButtonRelease() }
        >
        { this.props.name }
        {/* {
          Object.keys(this.props.urls).map((key) => {
            return this.props.urls[key].map(t=> t.url)
          })
        } */}
        </Button>  
      </div>
    )
  }
}


WorkspaceButton.propTypes = {
  name: PropTypes.string,
  urls: PropTypes.array
};

export default withStyles(styles)(WorkspaceButton)