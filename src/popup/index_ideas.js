import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ChromeRPC } from '../utils';

import '../index.css';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';

import Button from 'material-ui/Button';
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import withStyles from 'material-ui/styles/withStyles';
import CardHeader from 'material-ui/Card/CardHeader';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Modal from 'material-ui/Modal/Modal';

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

  render() {
    const { classes } = this.props
    console.log(this.props)
    return (
        <MuiThemeProvider theme={theme}>
        <div style={ styles.root }>
          <Workspace
            name={ 'Finance' }
            urls={ [
              { url: 'mint.com' },
              { url: 'visa.com' },
              { url: 'frank.com' },
            ] } />
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                M
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="My Amazingly superlong workspace name BAAAMM!!!"
            subheader="September 14, 2018"
          />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Button>Open</Button>
                  <Button>View</Button>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
        <Button>Overrides</Button>
        </MuiThemeProvider>  
    )
  }
}

const StyledPopup = withStyles(styles)(Popup);
ReactDOM.render(<StyledPopup />, document.getElementById('root'));
