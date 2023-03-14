import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AddDetailsScreen = ({navigation}) => {
  const [data, setData] = useState({});

  const saveData = async value => {
    let entryArray = [];
    try {
      const existingData = await AsyncStorage.getItem('name');
      if (existingData !== null) {
        entryArray = JSON.parse(existingData);
        entryArray.push(value);

        // We have data!!
        console.log(entryArray, typeof entryArray);
      } else {
        entryArray.push(value);
      }
      await AsyncStorage.setItem('name', JSON.stringify(entryArray));
    } catch (error) {
      // Error retrieving data
      console.log('error...!!', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.innerContainer}> Enter Text:</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={'Enter value'}
          placeholderTextColor="#000"
          onChangeText={text => setData({entry: text})}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          saveData(data);
          navigation.navigate('View-Details');
        }}>
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
          <Text style={styles.textbutton}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default AddDetailsScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
     alignItems: 'center',
      justifyContent: 'center'
    },
  innerContainer: {
    justifyContent: 'center',
    color: '#08d4c4',
    fontWeight: 'bold',
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
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    justifyContent: 'center',
    width: 250,
  },
});
