import React from 'react';
import {Text} from 'react-native';
import GenerateKeys from '../components/Keys/GenerateKeys';
import SpashScreen from '../components/shared/SplashScreen';
import useEOS from '../hooks/useEOS';

const HomeScreen = () => {
  const {
    jsProviderLoaded,
    pkSaved,
    privateKey,
    createPrivateKey,
    onPrivateKeySaved,
  } = useEOS();
  if (!pkSaved)
    return (
      <GenerateKeys
        pk={privateKey}
        createPrivateKey={createPrivateKey}
        onPrivateKeySaved={onPrivateKeySaved}
      />
    );
  if (!jsProviderLoaded) return <SpashScreen />;
  return <Text>Welcome to Bit Fitness</Text>;
};

export default HomeScreen;
