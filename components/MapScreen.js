import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);

    const {multiGeo, loc, speed, time} = props;
    const coordinates = multiGeo.map(({geocode: {lat, lng}}) => ({
      latitude: lat,
      longitude: lng,
    }));
    const initial = {
      latitude: loc.coordinates[0],
      longitude: loc.coordinates[1],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.state = {coordinates, initial, speed, time};
  }
  render() {
    const {coordinates, initial} = this.state;
    return (
      <View style={styles.container}>
        <MapView style={styles.mapContainer} initialRegion={initial}>
          <Marker
            coordinate={{
              latitude: initial.latitude,
              longitude: initial.longitude,
            }}
            title={'Vehicle'}
            description={'Vehicle current position'}
          />
          <Polyline
            coordinates={coordinates}
            strokeColor="#008000"
            strokeWidth={6}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {flex: 1},
});
