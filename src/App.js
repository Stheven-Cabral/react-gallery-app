import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch  
} from 'react-router-dom';
import Cookies from 'js-cookie';
import './css/index.css';
import apiKey from './data/config';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTopic: Cookies.get('searchCookie'),
      searchResults: [],
      catsResults: [],
      dogsResults: [],
      computersResults: [],
      randomResults: []
    };
  }

  retrieveSearch = (queryTopic) => {
    this.setState({searchTopic: queryTopic}, this.fetchData);
  }

  fetchData = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        searchResults: responseData.photos.photo
      });
      console.log(this.state.searchTopic);
    })
    .catch(error => {
      console.log('An Error Occurred', error)
    })
  }

  randomSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=random&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        randomResults: responseData.photos.photo
      });
    })
  }

  catsSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        catsResults: responseData.photos.photo
      });
    })
  }

  dogsSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        dogsResults: responseData.photos.photo
      });
    })
  }

  computersSearch = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        computersResults: responseData.photos.photo
      });
    })
  }

  componentDidMount() {
    this.randomSearch();
    this.catsSearch();
    this.dogsSearch();
    this.computersSearch();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm onSearch={this.retrieveSearch} />
          <Navigation />

          <Switch>
            <Route exact path="/" render={ () => <PhotoContainer fetchTopicData={this.fetchData} fetchedData={this.state.randomResults} popSearch={this.retrieveSearch} /> } /> 
            <Route path="/cats" render={ () => <PhotoContainer fetchTopicData={this.fetchData} fetchedData={this.state.catsResults} popSearch={this.retrieveSearch} /> } />
            <Route path="/dogs" render={ () => <PhotoContainer fetchTopicData={this.fetchData} fetchedData={this.state.dogsResults} popSearch={this.retrieveSearch} /> } />
            <Route path="/computers" render={ () => <PhotoContainer fetchTopicData={this.fetchData} fetchedData={this.state.computersResults} popSearch={this.retrieveSearch} /> } />
            <Route exact path="/search/:newTopic" render={ () => <PhotoContainer fetchTopicData={this.fetchData} fetchedData={this.state.searchResults} popSearch={this.retrieveSearch} /> } />
          </Switch>
        </div>
      </Router>
    );
  }
}

