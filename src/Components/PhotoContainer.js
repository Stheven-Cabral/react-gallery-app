import React, { Component } from 'react';
import Photo from './Photo';
import NotResults from './NoResults';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

class PhotoContainer extends Component {

  componentDidMount() {
    this.props.fetchTopicData(Cookies.get('searchCookie'));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
        Cookies.remove('searchCookie');
        Cookies.set('searchCookie', this.props.match.params.newTopic);
        this.props.popSearch(Cookies.get('searchCookie'));
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
              <NotResults />
            </ul>
        </div>
      )
    }
  }
}

export default withRouter(PhotoContainer);