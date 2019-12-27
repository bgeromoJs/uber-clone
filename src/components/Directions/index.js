import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({destination, origin, onReady}) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyBiMRcsUiL7ZM94_agMjD8XmujkEngo_EY"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
