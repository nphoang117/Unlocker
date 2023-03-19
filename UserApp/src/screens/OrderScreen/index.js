import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {getOrder, getLocksmith} from '../../graphql/queries';
import OrderMap from '../../components/OrderMap';
import {onLocksmithUpdated, onOrderUpdated} from './subscriptions';

const OrderScreen = () => {
  const [locksmith, setLocksmith] = useState(null);
  const [order, setOrder] = useState(null);

  const route = useRoute();

  console.log(route.params.id);

  // Fetch order on initial render
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await API.graphql(
          graphqlOperation(getOrder, {id: route.params.id}),
        );
        setOrder(orderData.data.getOrder);
      } catch (e) {
        console.error(e);
      }
    };
    fetchOrder();
  }, []);

  //Subscribe to order updates
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onOrderUpdated, {id: route.params.id}),
    ).subscribe({
      next: ({value}) => setOrder(value.data.onOrderUpdated),
      error: error => console.warn(error),
    });

    return () => subscription.unsubscribe();
  }, []);

  //Subscribe to locksmith updates
  useEffect(() => {
    if (!order?.lockSmithId || order.lockSmihId === '1') {
      return;
    }

    const subscription = API.graphql(
      graphqlOperation(onLocksmithUpdated, {id: order.lockSmithId}),
    ).subscribe({
      next: ({value}) => setLocksmith(value.data.onLocksmithUpdated),
      error: error => console.warn(error),
    });

    return () => subscription.unsubscribe();
  }, [order]);

  // Fetch locksmith data when order is updated
  useEffect(() => {
    if (!order?.lockSmithId || order.lockSmithId === '1') {
      return;
    }

    const fetchLocksmith = async () => {
      try {
        const locksmithData = await API.graphql(
          graphqlOperation(getLocksmith, {id: order.lockSmithId}),
        );
        setLocksmith(locksmithData.data.getLocksmith);
        console.log(locksmithData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchLocksmith();
  }, [order]);

  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <OrderMap locksmith={locksmith} />
      </View>
      <View>
        <Text>Order status: {order?.status}</Text>
      </View>
    </View>
  );
};

export default OrderScreen;
