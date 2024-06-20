// import React from 'react'
// import { View, Text } from 'react-native'

// export default function Home(): JSX.Element {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   )
// }

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Pergi ke Modal Detail"
        onPress={() => {
          navigation.navigate('MovieDetail');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginVertical20: {
    marginVertical: 20,
  },
});

export default Home;
