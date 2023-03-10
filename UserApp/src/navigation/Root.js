import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeNavigator from './Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DummyScreen = props => {
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>;
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name={'Trang chủ'}
          component={HomeNavigator}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name={'Đơn sửa khóa của bạn'}
          options={{headerShown: false}}>
          {() => <DummyScreen name={'Đơn sửa khóa của bạn'} />}
        </Drawer.Screen>

        <Drawer.Screen name={'Trợ giúp'} options={{headerShown: false}}>
          {() => <DummyScreen name={'Trợ giúp'} />}
        </Drawer.Screen>

        <Drawer.Screen name={'Ví'} options={{headerShown: false}}>
          {() => <DummyScreen name={'Ví'} />}
        </Drawer.Screen>

        <Drawer.Screen name={'Cài đặt'} options={{headerShown: false}}>
          {() => <DummyScreen name={'Cài đặt'} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
