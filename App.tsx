import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenProps} from './store/nav/types';
import AuthProvider from './providers/AuthProvider';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/Profile';

const Stack = createStackNavigator<ScreenProps>();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator screenOptions={{tabBarVisible: true}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const App = () => {
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
