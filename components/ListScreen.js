import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import locationData from '../constants/locationData';
import ItemContent from './ItemContent';
import MapScreen from './MapScreen';
import GestureRecognizer from 'react-native-swipe-gestures';

const Item = ({speed, time, onToggleAnimation, multiGeo, loc}) => (
  <Pressable
    style={styles.item}
    android_ripple={{color: '#efefef', borderless: false}}
    onPress={
      () => {
        onToggleAnimation({multiGeo, loc, speed, time});
      }
      // navigation.navigate('Location', {multiGeo, loc, speed, time})
    }>
    <ItemContent speed={speed} time={time} />
  </Pressable>
);

export default class ListScreen extends Component {
  constructor() {
    super();
    this.a;
    this.state = {
      animatedValue: new Animated.Value(1),
      listViewState: true,
      selectedVehicle: {},
    };
  }
  toggleAnimation = () => {
    const {listViewState} = this.state;
    if (listViewState) {
      Animated.timing(this.state.animatedValue, {
        toValue: 0.35,
        timing: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        this.setState({listViewState: false});
      });
    } else {
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        timing: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        this.setState({listViewState: true, selectedVehicle: {}});
      });
    }
  };
  renderItem = ({item}) => {
    const date = new Date(item.timestamp);
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return (
      <Item
        key={item._id}
        speed={item.sp}
        time={time}
        onToggleAnimation={(selectedVehicle) => {
          this.setState({selectedVehicle});
          this.toggleAnimation();
        }}
        multiGeo={item.multi_geo}
        loc={item.loc}
      />
    );
  };
  render() {
    const animatedStyle = {flex: this.state.animatedValue};
    const {listViewState, selectedVehicle} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {!listViewState && <MapScreen {...this.state.selectedVehicle} />}
        <Animated.View style={[{flex: 1}, animatedStyle]}>
          {listViewState ? (
            <FlatList
              data={locationData}
              renderItem={this.renderItem}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <GestureRecognizer
              onSwipeUp={this.toggleAnimation}
              style={[styles.itemContent]}>
              <ItemContent
                speed={selectedVehicle.speed}
                time={selectedVehicle.time}
              />
            </GestureRecognizer>
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 5,
    borderStartColor: 'cyan',
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
    borderEndColor: '#fff',
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 9,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  itemContent: {
    height: 150,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 5,
    borderStartColor: 'cyan',
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
    borderEndColor: '#fff',
    borderLeftWidth: 4,
    justifyContent: 'flex-end',
  },
});
