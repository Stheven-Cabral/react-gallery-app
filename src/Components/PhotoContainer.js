import React, { Component } from 'react';
import Photo from './Photo';
import { withRouter } from 'react-router-dom';

class PhotoContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.location.key !== prevProps.location.key) {
      this.props.popSearch(this.props.match.params.newTopic);
    }
  }

  render() {
    return (
      <div className="photo-container">
          <h2>Results</h2>
          <ul>
            <Photo photoData={this.props.fetchedData} />
          </ul>
      </div>
    )
  }
}

export default withRouter(PhotoContainer);