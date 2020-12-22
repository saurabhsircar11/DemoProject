import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import ItemContent from './ItemContent';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    const {route} = props;
    const {multiGeo, loc, speed, time} = route.params;
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
    const {coordinates, initial, speed, time} = this.state;
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
            strokeColor="#008000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        </MapView>
        <View style={styles.itemContainer}>
          <ItemContent speed={speed} time={time} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {flex: 0.75},
  itemContainer: {flex: 0.25},
});
