import PropTypes from 'prop-types';
import React, { Component } from 'react'


import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import CardHeader from 'material-ui/Card/CardHeader';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import IconButton from 'material-ui/IconButton';
import Modal from 'material-ui/Modal/Modal';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import ShareIcon from 'material-ui-icons/Share';
import Typography from 'material-ui/Typography';

import { styles } from './index';

class WorkspaceCard extends Component {
  
  render () {
    return (
      <div>
         <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <CardHeader
            avatar={
              <Avatar>
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
                  <Button style={ styles.customButton }>Open</Button>
                  <Button style={ styles.customButton }>View</Button>
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
        { this.props.name }
        { 
          Object.keys(this.props.urls).map((key) => {
            return this.props.urls[key].map(t=> t.url)
          })
        }
      </div>
    )
  }
}


WorkspaceCard.propTypes = {
  name: PropTypes.string,
  urls: PropTypes.array
};

export default WorkspaceCard