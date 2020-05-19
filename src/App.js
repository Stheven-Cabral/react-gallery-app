import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './css/index.css';
// import apiKey from './data/config';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Navigation />
          <PhotoContainer />

          <Switch>
            {/* Use search :topic for PhotoContainer component in order to search for that specific topic. */}
            <Route path="/:topic" component={PhotoContainer}/>
            <Route path="/cats" render={ () => <PhotoContainer topic="cats" /> } />
            <Route path="/dogs" render={ () => <PhotoContainer topic="dogs" /> } />
            <Route path="/computers" render={ () => <PhotoContainer topic="computers" /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

