import React, { Component } from 'react';
import './css/index.css';
import apiKey from './config';
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import PhotoContainer from './Components/PhotoContainer';

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
