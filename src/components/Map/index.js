import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Map = () => {
  const [region, setRegion] = useState({});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      }, //successo
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
      />
    </View>
  );
};

export default Map;
