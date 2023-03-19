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
import Geolocation from '@react-native-community/geolocation';
import {Amplify, Auth, API, graphqlOperation} from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure(config);

import HomeScreen from './src/screens/HomeScreen';
import {getLocksmithId} from './src/graphql/queries';
import {createLocksmith} from './src/graphql/mutations';

navigator.geolocation = require('@react-native-community/geolocation');

const App: () => React$Node = () => {
  useEffect(() => {
    const updateUserLocksmith = async () => {
      // Get authenticator user
      const authenticatedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (!authenticatedUser) {
        return;
      }

      // Check if the user has already a locksmith
      const locksmithData = await API.graphql(
        graphqlOperation(getLocksmithId, {
          id: authenticatedUser.attributes.sub,
        }),
      );

      if (!!locksmithData.data.getLocksmith) {
        console.log('User already a locksmith assigned');
        return;
      }

      // If not, create a new locksmith for the user
      const newLocksmith = {
        id: authenticatedUser.attributes.sub,
        type: 'Mở khóa nhà',
        userId: authenticatedUser.attributes.sub,
      };
      await API.graphql(
        graphqlOperation(createLocksmith, {input: newLocksmith}),
      );
    };

    updateUserLocksmith();
  }, []);

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

export default withAuthenticator(App);
