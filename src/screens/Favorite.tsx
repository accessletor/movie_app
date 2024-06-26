import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Card, Button } from 'react-native-elements'
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
      <Card containerStyle={styles.cardContainer}>
        <Card.Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Card.Title style={styles.title} numberOfLines={2}>
            {item.title}
          </Card.Title>
          <Card.Divider style={styles.divider} />
          <Text style={styles.overview} numberOfLines={3}>
            {item.overview}
          </Text>
          <Button
            title="View Details"
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('MovieDetail', { ...item })}
          />
        </View>
      </Card>
    </TouchableOpacity>
  )

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.emptyText}>No favorite movies found</Text>
        <Button
          title="Find Movies"
          type="outline"
          onPress={() => navigation.navigate('Home')}
          containerStyle={styles.buttonContainer}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container, styles.centered]}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background color
    padding: 10,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 10,
  },
  cardContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // Light gray card background color
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Title text color
  },
  divider: {
    backgroundColor: '#ccc', // Light gray divider color
    marginVertical: 5,
  },
  overview: {
    fontSize: 14,
    color: '#666', // Overview text color
  },
  button: {
    backgroundColor: '#ff4500', // Orange button background color
    marginTop: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#555', // Dark gray empty text color
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
})

export default FavoriteScreen
