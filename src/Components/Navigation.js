import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink exact to='/cats'>Cats</NavLink></li>
        <li><NavLink exact to='/dogs'>Dogs</NavLink></li>
        <li><NavLink exact to='/computers'>Computers</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;