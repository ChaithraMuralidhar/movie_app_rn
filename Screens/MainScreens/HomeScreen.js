import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase(
//   {
//     name: 'MainDB',
//     location: 'default',
//   },
//   () => {},
//   error => {
//     console.log(error);
//   },
// );

const HomeScreen = ({navigation}) => {
 

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Add-Details')}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
            <Text style={styles.buttonText}>Add Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('View-Details');
          }}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Movie-Details');
          }}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
            <Text style={styles.buttonText}>Movie Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Offline-Movies');
          }}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
            <Text style={styles.buttonText}>Offline Movie Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    margin: 40,
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
