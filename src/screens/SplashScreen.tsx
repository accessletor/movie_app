import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Icon from '../../assets/splash.png';

const SplashScreen= (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%', // Mengubah lebar gambar agar memenuhi lebar layar
    height: '100%', // Mengubah tinggi gambar agar memenuhi tinggi layar
    resizeMode: 'cover',
  },
});

export default SplashScreen;
