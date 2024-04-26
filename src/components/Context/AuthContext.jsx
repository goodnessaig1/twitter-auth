/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [requestToken, setRequestToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [oauthVerifier, setOauthVerifier] = useState('');
  const [authToken, setAuthToken] = useState('');
  const value = {
    requestToken,
    setRequestToken,
    accessToken,
    setAccessToken,
    oauthVerifier,
    setOauthVerifier,
    authToken,
    setAuthToken,
  };
  return (
    <AuthContext.Provider value={value}>{props?.children}</AuthContext.Provider>
  );
}
