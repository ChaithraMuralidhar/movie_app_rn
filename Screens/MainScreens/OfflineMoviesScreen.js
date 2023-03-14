import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const OfflineMoviesScreen = () => {
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState();

  useEffect(() => {
    viewMovieData();
  }, []);

  const viewMovieData = async () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Movie_Table', [], (tx, results) => {
        console.log('results', results);
        var temp = [];
        for (let i = 0; i <= results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setData(temp);

        if (results.rows.length >= 1) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      });
    });
  };
  // const listViewItemSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: '100%',
  //         backgroundColor: '#000',
  //       }}
  //     />
  //   );
  // };

  // _retrieveData = async() => {
  //   let entryArray = [];
  //   try {
  //     const existingData = await AsyncStorage.getItem('movie-detail');
  //     console.log("existing data",existingData);
  //     if (existingData !== null) {
  //       entryArray = JSON.parse(existingData);
  //       entryArray.push(existingData);

  //       // We have data!!
  //       console.log(entryArray, typeof entryArray);
  //     } else {
  //       entryArray.push(existingData);
  //     }
  //     await AsyncStorage.setItem('movie-detail', JSON.stringify(entryArray));
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log('error...!!', error);
  //   }
  //   this.setState({
  //     moviearray:entryArray
  //   })
  // };

  // _renderItem = ({item, index}) => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         borderBottomWidth: 1,
  //         borderBottomColor: '#eee',
  //       }}>
  //       <View>
  //         <Image
  //           source={{uri: `${item.posterurl}`}}
  //           style={{width: 120, height: 180}}
  //         />
  //       </View>
  //       <View
  //         style={{
  //           padding: 15,
  //           justifyContent: 'flex-start',
  //           alignItems: 'flex-start',
  //         }}>
  //         <Text
  //           style={{
  //             color: '#000',
  //             padding: 5,
  //             fontSize: 18,
  //             fontWeight: 'bold',
  //           }}>
  //           {item.id + ')  ' + item.title}
  //         </Text>
  //         <Text style={{color: '#000', padding: 5, fontSize: 14}}>
  //           {item.year}
  //         </Text>
  //         <Text style={{color: '#000', padding: 5, fontSize: 14}}>
  //           {item.storyline}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View keyboardShouldPersistTaps="handled">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            backgroundColor: '#08d4c4',
            padding: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'Rubik',
            }}>
            Movie's World
          </Text>
          <ImageBackground
            source={require('../../assets/MovieLogo.png')}
            style={{width: 50, height: 50}}
            imageStyle={{borderRadius: 25}}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View key={item?.movie_id} style={{padding: 20}}>
              <Text
                style={{
                  color: 'black',
                  padding: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Id: {item?.movie_id}
              </Text>
              <Image
                style={{width: 190, height: 250}}
                source={item?.movie_poster}
              />
              <Text
                style={{
                  color: 'black',
                  padding: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {' '}
                Name: {item?.movie_title}{' '}
              </Text>
              <Text style={{color: 'black', padding: 5, fontSize: 14}}>
                {' '}
                year: {item?.movie_year}{' '}
              </Text>
              <Text style={{color: 'black', padding: 5, fontSize: 14}}>
                {' '}
                story: {item?.movie_storyline}{' '}
              </Text>
            </View>
          )}
        />

        {/* <FlatList
              data={this.state.moviearray}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            /> */}
      </View>
    </SafeAreaView>
  );
};

export default OfflineMoviesScreen;
