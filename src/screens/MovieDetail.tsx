// import React from 'react'
// import { Text, View } from 'react-native'

// const MovieDetail = ({ route }: any): JSX.Element => {
//   const { id } = route.params

//   return (
//     <View
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         marginTop: 32,
//       }}
//     >
//       <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
//     </View>
//   )
// }

// export default MovieDetail

// import React, { useEffect, useState } from 'react';
// import { Text, View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
// import { API_ACCESS_TOKEN } from '@env';

// const windowWidth = Dimensions.get('window').width;

// const MovieDetail = ({ route }: any): JSX.Element => {
//   const { id } = route.params;
//   const [movie, setMovie] = useState<any>(null);

//   useEffect(() => {
//     fetchMovieDetail();
//   }, []);

//   const fetchMovieDetail = async () => {
//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_ACCESS_TOKEN}`
//       );
//       const data = await response.json();
//       setMovie(data);
//     } catch (error) {
//       console.error('Error fetching movie detail:', error);
//     }
//   };

//   if (!movie) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image
//         source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
//         style={styles.poster}
//         resizeMode="cover"
//       />
//       <View style={styles.details}>
//         <Text style={styles.title}>{movie.title}</Text>
//         <Text style={styles.movieId}>Movie ID: {id}</Text>
//         {movie.vote_average !== undefined && (
//           <View style={styles.ratingContainer}>
//             <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
//           </View>
//         )}
//         <Text style={styles.overview}>{movie.overview}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   poster: {
//     height: 400,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   details: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   movieId: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   rating: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     marginRight: 8,
//   },
//   overview: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
// });

// export default MovieDetail;


import React from 'react';
import { ScrollView, Text, View, StatusBar, StyleSheet, Image } from 'react-native'; // tambahkan Image di sini
import type { MovieListProps } from '../types/app';
import MovieList from '../components/movies/MovieList';

const movieLists: MovieListProps[] = [
  {
    title: 'Recommendation',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
  },
];

interface MovieDetailProps {
  route: {
    params: {
      id: string;
      title: string;
      overview: string; // tambahkan overview di sini
      backdrop_path: string; // tambahkan backdrop_path di sini
    };
  };
}

const MovieDetail = ({ route }: MovieDetailProps): JSX.Element => {
  const { title, overview, vote_average, release_date, backdrop_path, popularity, original_language } = route.params;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
           
           {backdrop_path && (
        <Image
          source={{ uri: imageBaseUrl + backdrop_path }}
          style={styles.backdropContainer}
          resizeMode="cover"
        />
      )}
      <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.rating}>⭐ {vote_average}</Text>
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
      
      {/* <Text style={{ fontSize: 20 }}>Movie ID: {id}</Text> */}
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
  );
};

const styles = StyleSheet.create({
  // scrollViewContainer: {
  //   flexGrow: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingTop: 32,
  // },
  // container: {
  //   flex: 1,
  //   paddingHorizontal: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  backdropContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: 130,
    left: 10
  // contoh: padding untuk teks
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rating: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  overview: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#807777'
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
    rowGap: 16,
  },
});

export default MovieDetail;
