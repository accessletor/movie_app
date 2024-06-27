// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Feather } from '@expo/vector-icons'
// // import Home from '../screens/Home'
// import HomeStackNavigation from './HomeStackNavigation'
// import Search from '../screens/Search'
// //import Favorite from '../screens/Favorite'
// //import FavoriteList from '../screens/favoriteList'
// import FavoriteScreen from './../screens/Favorite'
// import CategorySearchResult from '../components/search/CategorySearchResult'

// const Tab = createBottomTabNavigator()

// const BottomTabNavigator = (): JSX.Element => (
//   <Tab.Navigator>
//     <Tab.Screen
//       name="Home"
//       //   component={Home}
//       component={HomeStackNavigation}
//       options={{
//         tabBarIcon: ({ color }) => (
//           <Feather name="home" size={28} color={color} />
//         ),
//         headerShown: false,
//       }}
//     />
//     <Tab.Screen
//       name="Search"
//       component={Search}
//       options={{
//         tabBarIcon: ({ color }) => (
//           <Feather name="search" size={28} color={color} />
//         ),
//         headerShown: false,
//       }}
//     />
//     <Tab.Screen
//       name="Favorite"
//       component={FavoriteScreen}
//       options={{
//         tabBarIcon: ({ color }) => (
//           <Feather name="heart" size={28} color={color} />
//         ),
//         headerShown: false,
//       }}
//     />
//     <Tab.Screen
//       name="CategorySearchResult"
//       component={CategorySearchResult}
//       options={{ headerShown: true, title: 'Category Search Result' }}
//     />
//   </Tab.Navigator>
// )

// export default BottomTabNavigator


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
// import Home from '../../screens/Home';
// import SearchScreen from '../../screens/Search';
// import Favorite from '../../screens/Favorite';
// import MovieDetail from '../navigations/MovieDetail';
import Home from '../screens/Home';
import SearchScreen from '../screens/Search';
import FavoriteScreen from '../screens/Favorite';
import MovieDetail from '../screens/MovieDetail';
import CategorySearchResult from '../navigations/CategorySearchResult';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ headerShown: true, title: 'Movie Detail' }}
    />
  </Stack.Navigator>
);

const SearchStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ headerShown: true, title: 'Movie Detail' }}
    />
    <Stack.Screen
      name="CategorySearchResult"
      component={CategorySearchResult}
      options={{ headerShown: true, title: 'Category Search Result' }}
    />
  </Stack.Navigator>
);

const FavoriteStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen
      name="FavoriteScreen"
      component={FavoriteScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ headerShown: true, title: 'Movie Detail' }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = (): JSX.Element => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeStackNavigator}
      options={{
        tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{
        tabBarIcon: ({ color }) => <Feather name="search" size={28} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoriteStackNavigator}
      options={{
        tabBarIcon: ({ color }) => <Feather name="heart" size={28} color={color} />,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;