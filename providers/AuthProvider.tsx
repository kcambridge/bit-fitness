import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loggedIn: boolean;
  isLoggingIn: boolean;
  isInitializing: boolean;
  error: any | string;
  loginWithGoogle: () => void;
}

export const AuthContext = React.createContext<
  AuthContextType | Partial<AuthContextType>
>({});

const AuthProvider: React.FC = ({children}) => {
  const [
    firebaseUser,
    setFirebaseUserState,
  ] = useState<FirebaseAuthTypes.User | null>(null);
  const [loggedIn, setLoggedInState] = useState(false);
  const [isLoggingIn, setIsLoggingInState] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setErrorState] = useState<null | string>(null);

  const loginWithGoogle = useCallback(async () => {
    GoogleSignin.configure({
      webClientId: '',
    });
    setIsLoggingInState(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      const fireBaseResult = await auth().signInWithCredential(
        googleCredential
      );
      console.log(fireBaseResult);
      setLoggedInState(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorState('Sign in cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrorState('Sign in in progress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorState('Google play services not available');
        // play services not available or outdated
      } else {
        setErrorState('There was an unexpected error');
        // some other error happened
      }
    }
    setIsLoggingInState(false);
  }, []);

  //This firebase auth callback checks if the user is already logged in
  const onAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      setIsInitializing(false);
      if (user) {
        //if user is not null, they are logged in~
        setIsLoggingInState(false);
        setLoggedInState(true);
        setFirebaseUserState(user);
      }
    },
    []
  );

  //kick off firebase initialization and checking user loggedin state
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: firebaseUser,
        loggedIn,
        isLoggingIn,
        isInitializing,
        loginWithGoogle,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
