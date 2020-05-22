import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';

class PhotoContainer extends Component {

  componentDidUpdate(prevProps) {
    this.props.fetchTopicData(this.props.match.params.newTopic);
    if (this.props.location.key !== prevProps.location.key) {
      this.props.popSearch(this.props.match.params.newTopic);
    }
  }

  render() {
    if (this.props.fetchedData.length) {
      return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
              <Photo photoData={this.props.fetchedData} />
            </ul>
        </div>
      )
    } else {
      return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
              <NotFound />
            </ul>
        </div>
      )
    }
  }
}

export default withRouter(PhotoContainer);