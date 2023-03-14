import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './Screens/MainScreens/HomeScreen';
import AddDetailsScreen from './Screens/MainScreens/AddDetailsScreen';
import ViewDetailsScreen from './Screens/MainScreens/ViewDetailsScreen';
import RootStackScreen from './Screens/RootScreens/RootStackScreen';
import MovieDetailsScreen from './Screens/MainScreens/MovieDetailsScreen';
import OfflineMoviesScreen from './Screens/MainScreens/OfflineMoviesScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Logout">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Add-Details" component={AddDetailsScreen} />
        <Drawer.Screen name="View-Details" component={ViewDetailsScreen} />
        <Drawer.Screen name="Movie-Details" component={MovieDetailsScreen} />
        <Drawer.Screen name='Offline-Movies' component={OfflineMoviesScreen}/>
        <Drawer.Screen name="Logout" component={RootStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
