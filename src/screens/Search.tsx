import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import KeywordSearch from '../components/search/KeywordSearch'
import CategorySearch from '../components/search/CategorySearch'

const Search = (): JSX.Element => {
  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topBarContainer}>
          {['keyword', 'category'].map((item: string, index: number) => (
            <TouchableOpacity
              key={item}
              activeOpacity={0.9}
              style={{
                ...styles.topBar,
                backgroundColor: item === selectedBar ? '#8978A4' : '#C0B4D5',
                borderTopLeftRadius: index === 0 ? 100 : 0,
                borderBottomLeftRadius: index === 0 ? 100 : 0,
                borderTopRightRadius: index === 1 ? 100 : 0,
                borderBottomRightRadius: index === 1 ? 100 : 0,
              }}
              onPress={() => {
                setSelectedBar(item)
              }}
            >
              <Text style={styles.topBarLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedBar === 'keyword' ? <KeywordSearch /> : <CategorySearch />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 55,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})

export default Search