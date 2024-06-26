import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { Movie } from '../../types/app';
import { API_ACCESS_TOKEN, API_URL } from '@env';
import MovieItem from '../movies/MovieItem';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSubmit = async () => {
    if (keyword.trim() === '') {
      Alert.alert('Error', 'Please enter a keyword');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/search/movie?query=${keyword}`, {
        headers: {
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();

      if (data.results) {
        // Filter movies by original_title
        const filteredMovies = data.results.filter((movie: Movie) =>
          movie.original_title.toLowerCase().includes(keyword.toLowerCase())
        );
        setMovies(filteredMovies);
      } else {
        console.log('No movie data found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.movieItem}>
        <MovieItem
          movie={item}
          size={styles.movieImage}
          coverType="poster"
        />
        {/* <Text style={styles.movieTitle}>{item.original_title}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input movie title here"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSubmit}
        />
        <Feather name="search" size={24} color="gray" style={styles.icon} />
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.list}
        numColumns={3}
        // horizontal={true} // Make the list horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 15,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,
    position: 'absolute',
    right: 20,
    top: '40%',
  },
  list: {
    width: '100%',
  },
  movieItem: {
    flex: 1,
    padding: 8,
    alignItems: 'flex-start',
    width: '33.33%',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

export default KeywordSearch;

