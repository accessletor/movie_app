import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/app';

const FAVORITE_KEY = '@FavoriteList';

const getFavoriteMovies = async (): Promise<Movie[] | null> => {
  try {
    const initialData: string | null = await AsyncStorage.getItem(FAVORITE_KEY);
    return initialData ? JSON.parse(initialData) : null;
  } catch (error) {
    console.error('Error retrieving favorite movies:', error);
    return null;
  }
};

export const addFavorite = async (movie: Movie): Promise<void> => {
  try {
    const favMovieList = (await getFavoriteMovies()) || [];
    favMovieList.push(movie);
    await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favMovieList));
  } catch (error) {
    console.log('Error adding favorite:', error);
    // You can throw an error here if needed
  }
};

export const removeFavorite = async (id: number): Promise<void> => {
  try {
    const favMovieList = await getFavoriteMovies();
    if (favMovieList) {
      const filteredList = favMovieList.filter(
        (movie: Movie | null) => movie && movie.id !== id,
      );
      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(filteredList));
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const checkIsFavorite = async (id: number): Promise<boolean> => {
  try {
    const favMovieList = await getFavoriteMovies();
    return favMovieList?.some((movie: Movie) => movie.id === id) || false;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};
