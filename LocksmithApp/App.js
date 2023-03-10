// import 'react-native-gesture-handler';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {View} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden
      />
      <SafeAreaView>
        <HomeScreen />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
