import {useContext} from 'react';
import {AuthContext} from '../providers/AuthProvider';

function useAuth() {
  const {
    user,
    loggedIn,
    isLoggingIn,
    loginWithGoogle,
    isInitializing,
  } = useContext(AuthContext);

  return {user, loggedIn, isLoggingIn, loginWithGoogle, isInitializing};
}

export default useAuth;
