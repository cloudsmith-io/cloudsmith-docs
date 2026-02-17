import { useContext } from 'react';

import { ApiTestContext } from './ApiTestContext';
import { AuthContext } from './AuthContext';
import { MediaContext } from './MediaContext';
import { ParameterContext } from './ParameterContext';

const useParameters = () => {
  const context = useContext(ParameterContext);

  if (!context) {
    throw new Error('useParameters must be used within a ParameterProvider');
  }

  return context;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

const useMedia = () => {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }

  return context;
};

const useApiTest = () => {
  const context = useContext(ApiTestContext);

  if (!context) {
    throw new Error('useApiTest must be used within a ApiTestProvider');
  }

  return context;
};

export { useParameters, useApiTest, useMedia, useAuth };
