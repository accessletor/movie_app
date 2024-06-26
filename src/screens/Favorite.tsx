import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import type { Movie } from '../types/app'

const FavoriteScreen = (): JSX.Element => {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchFavorites)
    return unsubscribe
  }, [navigation])

  const fetchFavorites = async () => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const parsedData: Movie[] = JSON.parse(initialData)
        // Filter out any null or undefined items and ensure each movie has an id
        const validFavorites = parsedData.filter((movie) => movie && movie.id)
        setFavorites(validFavorites)
      }
    } catch (error) {
      console.error('Error fetching favorites:', error)
      // Optionally handle the error (e.g., show a toast or retry mechanism)
    }
  }

  const renderFavoriteItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', { ...item })}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.overview}>{item.overview}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite movies found</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={favorites}
      renderItem={renderFavoriteItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
  listContainer: {
    padding: 10,
  },
})

export default FavoriteScreen
