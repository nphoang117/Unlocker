import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import NewOrderPopup from '../../components/NewOrderPopup';

const origin = {latitude: 10.82313, longitude: 106.688829};
const destination = {latitude: 10.82213, longitude: 106.686829};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCf_iSaM4Uh7FbNBdVpBxq8-T9dMk4Xy50';

const HomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [order, setOrder] = useState(null);
  const [myPosition, setMyPosition] = useState(null);

  const [newOrder, setNewOrder] = useState({
    id: '1',
    type: 'Mở khóa nhà',

    originLatitude: 10.82213,
    originLongitude: 106.686829,

    destLatitude: 10.82313,
    destLongitude: 106.688829,

    user: {
      rating: 4.8,
      name: 'Hoang',
    },
  });

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onDecline = () => {
    setNewOrder(null);
  };

  const onAccept = newOrder => {
    setOrder(newOrder);
    setNewOrder(null);
  };

  const renderBottomTitle = () => {
    if (order) {
      console.log(order);
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>1 min</Text>
            <View
              style={{
                backgroundColor: '#1e9203',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>0.2 mi</Text>
          </View>
          <Text style={{color: 'black'}}>Picking up {order.user.name}</Text>
        </View>
      );
    }
    if (isOnline) {
      return <Text style={styles.bottomText}>Bạn đang online</Text>;
    }
    return <Text style={styles.bottomText}>Bạn đang offline</Text>;
  };

  const onUserLocationChange = event => {
    console.log('user location change');
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = event => {
    console.log('Direction found: ', event);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 10}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 10.82213,
          longitude: 106.686829,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <MapViewDirections
            origin={myPosition}
            onReady={onDirectionFound}
            destination={{
              latitude: order.originLatitude,
              longitude: order.originLongitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
          />
        )}
      </MapView>

      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>VND</Text> 0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 30, left: 10}]}>
        <Entypo name="menu" size={28} color={'#4a4a4a'} />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 30, right: 10}]}>
        <FontAwesome name="search" size={28} color={'#4a4a4a'} />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 80, right: 10}]}>
        <Entypo name="message" size={28} color={'#4a4a4a'} />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {bottom: 80, left: 10}]}>
        <Entypo name="shield" size={28} color={'#1495ff'} />
      </Pressable>

      <Pressable onPress={onGoPress} style={styles.goButton}>
        <Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name="options" size={28} color={'#4a4a4a'} />

        {renderBottomTitle()}

        <FontAwesome5 name="list-ul" size={28} color={'#4a4a4a'} />
      </View>

      {newOrder && (
        <NewOrderPopup
          newOrder={newOrder}
          duration={2}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )}
    </View>
  );
};

export default HomeScreen;
