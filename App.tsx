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
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigations/BottomTabNavigation';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import HomeStackNavigation from './src/navigations/HomeStackNavigation'
import SplashScreen from './src/screens/SplashScreen';

export default function App(): JSX.Element {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 300);
  }, []); // Menambahkan dependencies kosong agar useEffect hanya dipanggil sekali saat komponen dipasang
  return (
    <>
    {isShowSplash ? (
        <SplashScreen /> // Menggunakan Splash Screen sebagai komponen dengan huruf kapital yang benar
      ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <HomeStackNavigation /> */}
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
      )}
    </>
  );
}
