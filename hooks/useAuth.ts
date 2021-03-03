import {useContext} from 'react';
import {AuthContext} from '../providers/AuthProvider';

function useAuth() {
  const {user, loggedIn, isLoggingIn, loginWithGoogle} = useContext(
    AuthContext
  );

  return {user, loggedIn, isLoggingIn, loginWithGoogle};
}

export default useAuth;
