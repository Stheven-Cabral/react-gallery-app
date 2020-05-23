import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch  
} from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';
import './css/index.css';
import apiKey from './data/config';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      searchTopic: '',
      searchResults: [],
      catsResults: [],
      dogsResults: [],
      computersResults: [],
      randomResults: []
    };
  }

  /***
   * `fetchData` function - fetches data from Flickr when the search form is used.
   */
  fetchData = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${Cookies.get('searchCookie')}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        searchResults: responseData.photos.photo,
        loading: false
      });
    })
    .catch(error => {
      console.log('An Error Occurred', error)
    })
  }

  /***
   * The following three functions fetch data from Flickr for the 'cat', dog', and 'computer topics.
   */
  catsSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        catsResults: responseData.photos.photo,
        loading: false
      });
    })
  }

  dogsSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        dogsResults: responseData.photos.photo,
        loading: false
      });
    })
  }

  computersSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        computersResults: responseData.photos.photo,
        loading: false
      });
    })
  }

  /***
   * `retrieveSearch` function - sets the `searchTopic` state to the `searchCookie` cookie and calls the `fetchData` function.
   */
  retrieveSearch = () => {
    this.setState({
      searchTopic: Cookies.get('searchCookie')}, 
      this.fetchData
    );
  }

  /***
   * `resetLoadingState` function - sets the `loading` state to true.
   */
  resetLoadingState = () => {
    this.setState({
      loading: true
    });
  }

  /***
   * When the App component mounts, cat, dog, and computer data fetching functions are called.
   */
  componentDidMount() {
    this.catsSearch();
    this.dogsSearch();
    this.computersSearch();
  }

  render() {
    return (
      <Router>
        <h1 className="page-title">Gallery Search Tool</h1>
        <div className="container">
          <SearchForm onSearch={this.retrieveSearch} resetLoadState={this.resetLoadingState} />
          <Navigation />

          <Switch>
            <Route exact path="/" /> 
            <Route exact path="/cats" render={ () => 
              <PhotoContainer 
              fetchTopicData={this.fetchData} 
              fetchedData={this.state.catsResults} 
              popSearch={this.retrieveSearch} 
              loadState={this.state.loading}/> } />
            <Route exact path="/dogs" render={ () => 
              <PhotoContainer 
              fetchTopicData={this.fetchData} 
              fetchedData={this.state.dogsResults} 
              popSearch={this.retrieveSearch} 
              loadState={this.state.loading}/> } />
            <Route exact path="/computers" render={ () => 
              <PhotoContainer 
              fetchTopicData={this.fetchData} 
              fetchedData={this.state.computersResults} 
              popSearch={this.retrieveSearch} 
              loadState={this.state.loading}/> } />
            <Route exact path="/search/:newTopic" render={ () => 
              <PhotoContainer fetchTopicData={this.fetchData} 
              fetchedData={this.state.searchResults} 
              popSearch={this.retrieveSearch} 
              loadState={this.state.loading}/> } />
            <Route component={NotFound}/>
          </Switch>
        
        </div>
      </Router>
    );
  }
}

