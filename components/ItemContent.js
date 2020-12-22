import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function ItemContent({speed, time}) {
  return (
    <>
      <Text style={styles.title}>
        ASHOK LEYLAND - VIKING BS4 TF1812 BS4 WITH IEGR
      </Text>
      <View style={styles.vehicleView}>
        <Text style={styles.vehicleNumber}>GJ 07 YZ 6879</Text>
        <Text style={styles.vehicleStatus}>MOVING</Text>
      </View>
      <View style={styles.statusDetails}>
        <Text style={styles.time}>{speed} km/hr</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.distance}>154,282 km</Text>
      </View>
      <View>
        <Text style={styles.address}>
          NH47, Kali Talai, Gujarat 389160, India
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 9,
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  address: {fontSize: 10, paddingHorizontal: 10, paddingBottom: 30},
  distance: {fontSize: 10, paddingRight: 5, color: 'cyan'},
  time: {
    fontSize: 10,
    paddingRight: 5,
  },
  statusDetails: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  vehicleNumber: {paddingRight: 10, color: 'cyan'},
  vehicleStatus: {fontSize: 10, color: 'cyan'},
  vehicleView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});
