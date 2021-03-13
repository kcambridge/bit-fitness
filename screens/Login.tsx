import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {ScreenProps} from '../store/nav/types';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import useAuth from '../hooks/useAuth';
import ScreenShell from '../components/shared/ScreenShell';
import Logo from '../components/shared/Logo/Logo';

type ProfileScreenNavigationProp = StackNavigationProp<ScreenProps, 'Login'>;

interface LoginProps {
  navigation: ProfileScreenNavigationProp;
}

const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  const {loggedIn, loginWithGoogle, isLoggingIn, isInitializing} = useAuth();
  useEffect(() => {
    if (loggedIn) {
      navigation.navigate('Home');
    }
  }, [loggedIn]);
  return (
    <ScreenShell>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo width={300} height={150} />
        </View>
        {(isInitializing || isLoggingIn) && <ActivityIndicator />}
        {!isInitializing && (
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={loginWithGoogle}
            disabled={isLoggingIn}
          />
        )}
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    marginBottom: 60,
  },
});

export default LoginScreen;
