import React, { Component } from 'react';
import './css/index.css';
// import apiKey from './data/config';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {

  render() {
    return (
      <div className="container">
        <SearchForm />
        <Navigation />
        <PhotoContainer />
      </div>
    );
  }
}

