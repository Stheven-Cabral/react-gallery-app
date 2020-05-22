import React from 'react';

const Photo = (props) => {
  const listPhotos = props.photoData.map(photo => 
    <li key={photo.id}>
      <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
    </li>
  );

  return (
    listPhotos
  )
};

export default Photo;