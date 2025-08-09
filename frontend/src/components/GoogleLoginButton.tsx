import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface DecodedUser {
  name?: string;
  email?: string;
  picture?: string;
  // Add other fields you plan to use
}

interface GoogleLoginButtonProps {
  onLoginSuccess: (user: DecodedUser) => void;
  onLoginFailure?: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const user = jwtDecode<DecodedUser>(credentialResponse.credential);
      onLoginSuccess(user);
    }
  };

  const handleError = () => {
    if (onLoginFailure) onLoginFailure();
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap // Optional: shows Google One Tap prompt
    />
  );
};

export default GoogleLoginButton;
