import { View, Text, StatusBar, Image } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IconStore } from '../assets';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EC6E51' }}>
      <Image
        source={IconStore}
        style={{ height: 150, width: 150 }}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 20,
        }}>
        Sales App
      </Text>
    </View>
  );
};

export default SplashScreen;
