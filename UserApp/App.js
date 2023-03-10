import 'react-native-gesture-handler';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {withAuthenticator} from 'aws-amplify-react-native';

import Router from './src/navigation/Root';

import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
// import Auth from "@aws-amplify/auth";
Amplify.configure(config);
// Auth.configure(config);

navigator.geolocation = require('@react-native-community/geolocation');

const App: () => React$Node = () => {
  const androidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Unlocker App location Permission',
          message:
            'Unlocker App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermissions();
    } else {
      //Android
      Geolocation.requestAuthorization();
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        // hidden
      />
      <Router />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
