// // navigations/HomeStackNavigation.tsx
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from '../screens/Home';
// import MovieDetail from '../screens/MovieDetail';

// const Stack = createStackNavigator();

// const HomeStackNavigation = (): JSX.Element => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Home"
//       component={Home}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen
//       name="MovieDetail"
//       component={MovieDetail}
//       options={{ headerShown: false }}
//     />
//   </Stack.Navigator>
// );

// export default HomeStackNavigation;

// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Home from '../screens/Home'
// import MovieDetail from '../screens/MovieDetail'

// const Stack = createNativeStackNavigator()

// const HomeStackNavigation = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="MovieDetail" component={MovieDetail} />
//     </Stack.Navigator>
//   )
// }

// export default HomeStackNavigation

import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginVertical20: {
    marginVertical: 20,
  },
})

export default function HomeStackNavigation({ navigation }: { navigation: any }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Movie Page</Text>
      <Button
        title="Pergi ke Movie Detail"
        onPress={() => navigation.navigate('MovieDetail')}
      />
    </View>
  )
}
