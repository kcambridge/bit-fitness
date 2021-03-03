import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useState} from 'react';

interface AuthContextType {
  user: User | null;
  loggedIn: boolean;
  isLoggingIn: boolean;
  error: any | string;
  loginWithGoogle: () => void;
}

export const AuthContext = React.createContext<
  AuthContextType | Partial<AuthContextType>
>({});

const AuthProvider: React.FC = ({children}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loggedIn, setLoggedInState] = useState(false);
  const [isLoggingIn, setIsLoggingInState] = useState(false);
  const [error, setErrorState] = useState<null | string>(null);

  const loginWithGoogle = useCallback(async () => {
    GoogleSignin.configure({
      webClientId: '',
    });
    setIsLoggingInState(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUserState(userInfo);
      setLoggedInState(true);
    } catch (error) {
      console.log('There was an error', error);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        isLoggingIn,
        loginWithGoogle,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
