// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import BottomTabNavigator from './src/navigations/BottomTabNavigation'

// export default function App(): JSX.Element {
//   return (
//     <NavigationContainer>
//       <BottomTabNavigator />
//     </NavigationContainer>
//   )
// }

// coba
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigations/BottomTabNavigation'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
// import HomeStackNavigation from './src/navigations/HomeStackNavigation'

export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <HomeStackNavigation /> */}
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
