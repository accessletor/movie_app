// FavoriteButton.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Movie = {
  id: number
  title: string
  backdrop_path: string
  overview: string
  [key: string]: any // menambahkan properti opsional lainnya
}

const FavoriteButton = ({ movie }: { movie: Movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    const favoriteStatus = await checkIsFavorite(movie.id);
    setIsFavorite(favoriteStatus);
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie];
      } else {
        favMovieList = [movie];
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      let favMovieList: Movie[] = [];

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData);
        favMovieList = favMovieList.filter((movie) => movie.id !== id);
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        return favMovieList.some((movie) => movie.id === id);
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handlePress = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f52c40',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FavoriteButton;
