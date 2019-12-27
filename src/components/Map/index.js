import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Search from '../Search';
import Directions from '../Directions';
import {getPixelSize} from '../../utils';
import markerImage from '../../assets/marker.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';

const Map = () => {
  const [region, setRegion] = useState();
  const [destination, setDestination] = useState();

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

  const handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={el => (this.mapView = el)}>
        {destination && (
          <>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelSize(50),
                    left: getPixelSize(50),
                    top: getPixelSize(50),
                    bottom: getPixelSize(50),
                  },
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{x: 0, y: 0}}
              image={markerImage}>
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{x: 0, y: 0}}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>31</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>R. Esperança</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </MapView>

      <Search onLocationSelected={handleLocationSelected} />
    </View>
  );
};

export default Map;
