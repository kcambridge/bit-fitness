import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Logo from './Logo/Logo';

const SpashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={300} height={150} />
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
});

export default SpashScreen;
