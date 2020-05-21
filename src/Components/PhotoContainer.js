import React, { Component } from 'react';
import Photo from './Photo';
import { BrowserRouter as Router, withRouter, Redirect } from 'react-router-dom';

class PhotoContainer extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  componentDidUpdate(prevProps) {
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