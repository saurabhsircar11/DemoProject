import React, {Component} from 'react';
import {StyleSheet, View, Pressable, FlatList} from 'react-native';
import locationData from '../constants/locationData';
import ItemContent from './ItemContent';

const Item = ({speed, time, navigation, multiGeo, loc}) => (
  <Pressable
    style={styles.item}
    android_ripple={{color: '#efefef', borderless: false}}
    onPress={() =>
      navigation.navigate('Location', {multiGeo, loc, speed, time})
    }>
    <ItemContent speed={speed} time={time} />
  </Pressable>
);

export default class ListScreen extends Component {
  renderItem = ({item}) => {
    const date = new Date(item.timestamp);
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return (
      <Item
        key={item._id}
        speed={item.sp}
        time={time}
        navigation={this.props.navigation}
        multiGeo={item.multi_geo}
        loc={item.loc}
      />
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={locationData}
          renderItem={this.renderItem}
          keyExtractor={(item) => item._id}
        />
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
});
