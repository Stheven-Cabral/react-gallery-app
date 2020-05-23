import React, { Component } from 'react';
import Photo from './Photo';
import NoResults from './NoResults';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

class PhotoContainer extends Component {

  /***
   * On component mount, the `fetchTopicData` function prop is called to fetch data based on a user's search value that was set to cookie `searchCookie`.
   * This ensures fetched data is available so when a user reloads the page, the users search results are displayed.
   */
  componentDidMount() {
    this.props.fetchTopicData(Cookies.get('searchCookie'));
  }

  /***
   * The following code ensures proper search results are displayed when the back and forward browser buttons are clicked.
   */
  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
        Cookies.remove('searchCookie');
        Cookies.set('searchCookie', this.props.match.params.newTopic);
        this.props.popSearch(Cookies.get('searchCookie'));
      }
  }

  render() {
    if (this.props.loadState) {
      return <h2>Loading Results...</h2>
    } else if (this.props.fetchedData.length) {
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
            <NoResults />
          </ul>
        </div>
      )
    }
  }
}

export default withRouter(PhotoContainer);