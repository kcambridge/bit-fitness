import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Button, Text} from 'react-native';
import {ScreenProps} from '../store/nav/types';

type ProfileScreenNavigationProp = StackNavigationProp<ScreenProps, 'Login'>;

interface LoginProps {
  navigation: ProfileScreenNavigationProp;
}
const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  return (
    <>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </>
  );
};

export default LoginScreen;
