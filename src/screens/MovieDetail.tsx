import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card, Divider } from 'react-native-elements';
import type { MovieListProps, Movie } from '../types/app';
import MovieList from '../components/movies/MovieList';

// const movieLists: MovieListProps[] = [
//   {
//     title: 'Recommendation',
//     path: 'movie/popular?language=en-US&page=1',
//     coverType: 'poster',
//   },
// ];

interface MovieDetailProps {
  route: {
    params: {
      id: number
      title: string
      overview: string
      backdrop_path: string
      vote_average: number
      release_date: string
      popularity: number
      original_language: string
    }
  }
}

const MovieDetail = ({ route }: MovieDetailProps): JSX.Element => {
  const navigation = useNavigation();

  if (!route || !route.params) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie data is not available</Text>
      </View>
    );
  }

  const {
    id,
    title,
    overview,
    vote_average,
    release_date,
    backdrop_path,
    popularity,
    original_language,
  } = route.params;

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id !== undefined) {
      checkIsFavorite(id);
    }
  }, [id]);

  const addFavorite = async () => {
    const movie = {
      id,
      title,
      overview,
      backdrop_path,
      vote_average,
      release_date,
      popularity,
      original_language,
    };
    await addFavoriteToStorage(movie);
  };

  const removeFavorite = async () => {
    await removeFavoriteFromStorage(id);
    // navigation.navigate('Home'); // Navigasi ke layar Home setelah favorit dihapus
  };

  const addFavoriteToStorage = async (movie: Movie): Promise<void> => {
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

  const removeFavoriteFromStorage = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        const updatedList = favMovieList.filter((movie) => movie.id !== id);
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(updatedList));
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFavorite = async (id: number) => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList');
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData);
        const isFav = favMovieList.some((movie) => movie.id === id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const movieLists: MovieListProps[] = [
    {
      title: 'Recommendations',
      path: `/movie/${id}/recommendations`,
      coverType: 'poster',
    },
  ];

  return (
    <ScrollView>
      <Card containerStyle={styles.cardContainer}>
        {backdrop_path && (
          <View style={styles.backdropContainer}>
            <Image
              source={{ uri: imageBaseUrl + backdrop_path }}
              style={styles.backdropImage}
              resizeMode="cover"
            />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {vote_average}</Text>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={isFavorite ? removeFavorite : addFavorite}
              >
                {isFavorite ? (
                  <FontAwesome name="heart" size={24} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={24} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Divider style={styles.divider} />
        <Text style={styles.overview}>{overview}</Text>
        <Divider style={styles.divider} />
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Popularity</Text>
            <Text style={styles.value}>{popularity}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.detailItem}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.value}>{original_language}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.detailItem}>
            <Text style={styles.label}>Release Date</Text>
            <Text style={styles.value}>{release_date}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.movieListsContainer}>
          {movieLists.map((movieList) => (
            <MovieList
              title={movieList.title}
              path={movieList.path}
              coverType={movieList.coverType}
              key={movieList.title}
            />
          ))}
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    elevation: 5,
  },
  backdropContainer: {
    position: 'relative',
  },
  backdropImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  favoriteButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 20,
  },
  overview: {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 15,
    textAlign: 'justify',
  },
  detailsContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  movieListsContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: '#ccc',
  },
});

export default MovieDetail;
