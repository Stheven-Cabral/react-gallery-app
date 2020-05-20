import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './css/index.css';
import apiKey from './data/config';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      catsResults: [],
      dogsResults: [],
      computersResults: [],
      randomResults: []
    };
  }

  performSearch = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        searchResults: responseData.photos.photo
      });
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
      console.log(responseData.photos.photo);
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
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Navigation />

          <Switch>
            <Route exact path="/" render={ () => <PhotoContainer fetchedData={this.state.randomResults} /> } /> 
            <Route path="/cats" render={ () => <PhotoContainer fetchedData={this.state.catsResults} /> } />
            <Route path="/dogs" render={ () => <PhotoContainer fetchedData={this.state.dogsResults} /> } />
            <Route path="/computers" render={ () => <PhotoContainer fetchedData={this.state.computersResults} /> } />
            <Route path="/:newTopic" render={ () => <PhotoContainer fetchedData={this.state.searchResults} /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

