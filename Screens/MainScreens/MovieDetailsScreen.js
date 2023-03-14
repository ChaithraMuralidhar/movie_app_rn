import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const MovieDetailsScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMovieData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-in-theaters.json',
      );
      const myData = await response.json();
      setData(myData);
      setLoading(false);
      console.log(myData);
      myData.forEach(item => {
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO Movie_Table ( movie_title,movie_poster, movie_year, movie_storyline) VALUES (?,?,?,?)',
            [item.title,item.poster ,item.year, item.storyline],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('Data Inserted Successfully....');
              } else Alert.alert('Failed....');
            },
            console.log('INSERTED DATA......!!!!')
          );
          
        });
      });
    } catch (error) {
      console.log("api access:",error);
    }
  };

  useEffect(() => {
    createTable();
    getMovieData();
  }, []);

  const createTable =() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Movie_Table(movie_id INTEGER PRIMARY KEY AUTOINCREMENT, movie_title VARCHAR(50),movie_poster BLOB, movie_year INT(10), movie_storyline VARCHAR(555))',
      );
      console.log('table created successfully...!!!!');
  
  });
  }



  // const insertToTable = () =>{
  //    db.transaction((tx)=>{
  //     //   tx.executeSql(
  //     //   "INSERT INTO Movies (title,year) VALUES ('"+title+"','"+year+"')"
  //     // );
  //     tx.executeSql(
  //       "INSERT INTO Movies (title,year) VALUES (?,?)"
  //       [title,year],
  //       (tx, results) => {
  //         console.log('Results', results.rowsAffected);
  //         if (results.rowsAffected > 0) {
  //           Alert.alert('Data Inserted Successfully....');
  //           console.log('Data Inserted Successfully....');
  //         } else Alert.alert('Failed....');
  //       }

  //     );
  //   })
  // }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.tableView}>
        <Text style={styles.primaryText}>{item.id + ')  ' + item.title}</Text>

          <Image
            source={{uri: `${item.posterurl}`}}
            style={styles.imageStyle}
          />
                    <Text style={styles.secondaryText}>{item.year}</Text>
          <Text style={styles.secondaryText}>{item.storyline}</Text>

        
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="lightgreen" />
        <Text style={styles.loaderStyle}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View keyboardShouldPersistTaps="handled" style={{paddingBottom: 100}}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Movie's World</Text>
            <ImageBackground
              source={require('../../assets/MovieLogo.png')}
              style={styles.logo}
              imageStyle={{borderRadius: 25}}
            />
          </View>

          <FlatList
            style={{padding: 5}}
            data={data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  tableView: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageStyle: {
    width: 190,
    height: 250,
  },
  contentStyle: {
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  primaryText: {
    color: '#000',
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#000',
    padding: 5,
    fontSize: 16,
    
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {
    marginTop: 10,
    fontSize: 25,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#08d4c4',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Rubik',
  },
  logo: {
    width: 50,
    height: 50,
  },
});
