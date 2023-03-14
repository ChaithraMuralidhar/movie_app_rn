import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DataTable} from 'react-native-paper';

const ViewDetailsScreen = ({navigation}) => {
  const [val, setVal] = useState([]);

  const _retrieveData = async () => {
    // await AsyncStorage.removeItem('name');
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        let parsedArray = JSON.parse(value);
        setVal(parsedArray);
        // We have data!!
        console.log(parsedArray, typeof parsedArray);
      }
    } catch (error) {
      // Error retrieving data
      console.log('error...!!', error);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        {val &&
          val.map((item, index) => (
            <Text key={index} style={{paddingVertical: 10, color: '#000'}}>
              {item.entry}{' '}
            </Text>
          ))}
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
            <Text style={styles.textbutton}>Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ViewDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  innerContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textbutton: {
    color: 'white',
    fontWeight: 'bold',
  },
});
