import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { MovieListProps, Movie } from '../types/app'
import MovieList from '../components/movies/MovieList'

const movieLists: MovieListProps[] = [
  {
    title: 'Recommendation',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
  },
]

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
  const navigation = useNavigation()

  if (!route || !route.params) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie data is not available</Text>
      </View>
    )
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
  } = route.params

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    if (id !== undefined) {
      checkIsFavorite(id)
    }
  }, [id])

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
    }
    await addFavoriteToStorage(movie)
  }

  const removeFavorite = async () => {
    await removeFavoriteFromStorage(id)
    navigation.navigate('Home') // Navigasi ke layar Home setelah favorit dihapus
  }

  const addFavoriteToStorage = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      let favMovieList: Movie[] = []
      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavoriteFromStorage = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        const updatedList = favMovieList.filter((movie) => movie.id !== id)
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(updatedList))
        setIsFavorite(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIsFavorite = async (id: number) => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        const isFav = favMovieList.some((movie) => movie.id === id)
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      {backdrop_path && (
        <Image
          source={{ uri: imageBaseUrl + backdrop_path }}
          style={styles.backdropContainer}
          resizeMode="cover"
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {vote_average}</Text>
          <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
            {isFavorite ? (
              <FontAwesome name="heart" size={24} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.overview}>{overview}</Text>
      <View style={styles.container}>
        <View style={styles.isi}>
          <Text style={styles.label}>Popularitas</Text>
          <Text style={styles.value}>{popularity}</Text>
        </View>
        <View style={styles.isi}>
          <Text style={styles.label}>Bahasa</Text>
          <Text style={styles.value}>{original_language}</Text>
        </View>
      </View>

      <Text style={styles.releaseDate}>{release_date}</Text>
      <ScrollView>
        <View style={styles.movieListsContainer}>
          {movieLists.map((movieList) => (
            <MovieList
              title={movieList.title}
              path={movieList.path}
              coverType={movieList.coverType}
              key={movieList.title}
            />
          ))}
          <StatusBar translucent={false} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  backdropContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 130,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  overview: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#807777',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  isi: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#4d62eb',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#323a6b',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 18,
    color: '#f52c40',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieListsContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default MovieDetail
