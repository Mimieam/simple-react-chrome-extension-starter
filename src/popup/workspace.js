import PropTypes from 'prop-types';
import React, { Component } from 'react'

class WorkspaceCard extends Component {
  
  render () {
    return (
      <div>
        {this.props.name}
        {(this.props.urls.map(o => o.url)).join(', ')}
      </div>
    )
  }
}

export default WorkspaceCard

WorkspaceCard.propTypes = {
  name: PropTypes.string,
  urls: PropTypes.array
};