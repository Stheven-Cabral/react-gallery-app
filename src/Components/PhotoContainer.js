import React from 'react';
import Photo from './Photo';

const PhotoContainer = (props) => {
  return (
    <div className="photo-container">
        <h2>Results</h2>
        <ul>
          <Photo photoData={props.fetchedData} />
        </ul>
      </div>
  )
}

export default PhotoContainer;