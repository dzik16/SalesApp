import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from '../screens/SplashScreen';
import OrderListScreen from '../screens/home/OrderListScreen';
import OrderInputScreen from '../screens/home/OrderInputScreen';
import ModalScreen from '../components/Modal';
import ModalProcess from '../components/ModalProcess';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

const RootStack = createNativeStackNavigator();
const RootStackScreen = () => (
  <NavigationContainer>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootStack.Navigator initialRouteName="Splash">
        <RootStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Home"
          component={OrderListScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Input"
          component={OrderInputScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ModalProcess"
          component={ModalProcess}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </GestureHandlerRootView>
  </NavigationContainer>
);

export default RootStackScreen;
