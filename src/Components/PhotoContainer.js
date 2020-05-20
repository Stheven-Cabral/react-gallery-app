import React from 'react';
import Photo from './Photo';

const PhotoContainer = ({match}) => {
  return (
    <div className="photo-container">
        <h2>Results</h2>
        <ul>
          <Photo />
        </ul>
      </div>
  )
}

export default PhotoContainer;