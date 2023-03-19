import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {API, Auth, graphqlOperation} from 'aws-amplify';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import NewOrderPopup from '../../components/NewOrderPopup';
import {getLocksmith, listOrders} from '../../graphql/queries';
import {updateLocksmith, updateOrder} from '../../graphql/mutations';

const origin = {latitude: 10.82313, longitude: 106.688829};
const destination = {latitude: 10.82213, longitude: 106.686829};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDnFZB9UjiANx2WTie4-dN8fkd7NDi_QDc';

const HomeScreen = () => {
  const [locksmith, setLocksmith] = useState(null);
  const [order, setOrder] = useState(null);
  const [myPosition, setMyPosition] = useState(null);

  const [newOrders, setNewOrders] = useState([]);

  const fetchLocksmith = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const locksmithData = await API.graphql(
        graphqlOperation(getLocksmith, {id: userData.attributes.sub}),
      );
      setLocksmith(locksmithData.data.getLocksmith);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLocksmith();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await API.graphql(
        graphqlOperation(listOrders, {filter: {status: {eq: 'NEW'}}}),
      );
      setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.error(e);
    }
  };

  const onGoPress = async () => {
    //Update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        isActive: !locksmith.isActive,
      };
      const updatedLocksmithData = await API.graphql(
        graphqlOperation(updateLocksmith, {input}),
      );
      setLocksmith(updatedLocksmithData.data.updateLocksmith);
    } catch (e) {
      console.error(e);
    }
  };

  const onDecline = () => {
    setNewOrders(newOrders.slice(1));
  };

  const onAccept = async newOrder => {
    try {
      const input = {
        id: newOrder.id,
        status: 'PICKING_UP_CLIENT',
        lockSmithId: locksmith.id,
      };
      const orderData = await API.graphql(
        graphqlOperation(updateOrder, {input}),
      );
      setOrder(orderData.data.updateOrder);
    } catch (e) {
      console.error(e);
    }

    setNewOrders(newOrders.slice(1));
  };

  const onDirectionFound = event => {
    console.log('Direction found: ', event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  // useEffect(() => {
  //   if (order && order.distance && order.distance < 0.2) {
  //     setOrder({
  //       ...order,
  //       pickedUp: true,
  //     });
  //   }
  // }, [order]);

  const onUserLocationChange = async event => {
    // setMyPosition(event.nativeEvent.coordinate);
    const {latitude, longitude, heading} = event.nativeEvent.coordinate;
    // console.log("Position: ", event.nativeEvent.coordinate);
    //Update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        latitude,
        longitude,
        heading,
      };
      const updatedLocksmithData = await API.graphql(
        graphqlOperation(updateLocksmith, {input}),
      );
      setLocksmith(updatedLocksmithData.data.updateLocksmith);
    } catch (e) {
      console.error(e);
    }
  };

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      // if (true) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cb1a1a',
              width: 200,
              padding: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              COMPLETE {order.type}
            </Text>
          </View>
          <Text style={{color: 'black'}}> {order.user.username}</Text>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} phút</Text>
            <View
              style={{
                backgroundColor: '#d41212',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={{color: 'black'}}>
            Dropping off {order?.user?.username}
          </Text>
        </View>
      );
    }

    if (order) {
      console.log(order);
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} phút</Text>
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
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={{color: 'black'}}>
            Picking up {order?.user?.username}
          </Text>
        </View>
      );
    }
    if (locksmith?.isActive) {
      return <Text style={styles.bottomText}>Bạn đang online</Text>;
    }
    return <Text style={styles.bottomText}>Bạn đang offline</Text>;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 20}}
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
            origin={{
              latitude: locksmith?.latitude,
              longitude: locksmith?.longitude,
            }}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
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

      {/* <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 30, left: 10}]}>
        <Entypo name="menu" size={28} color={'#4a4a4a'} />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[styles.roundButton, {top: 30, right: 10}]}>
        <FontAwesome name="search" size={28} color={'#4a4a4a'} />
      </Pressable> */}

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
        <Text style={styles.goText}>{locksmith?.isActive ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name="options" size={28} color={'#4a4a4a'} />

        {renderBottomTitle()}

        <FontAwesome5 name="list-ul" size={28} color={'#4a4a4a'} />
      </View>

      {newOrders.length > 0 && !order && (
        <NewOrderPopup
          newOrder={newOrders[0]}
          duration={2}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrders[0])}
        />
      )}
    </View>
  );
};

export default HomeScreen;
