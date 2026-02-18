import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { AuthOption, AuthState } from '@/lib/operations/param-state/types';
import { operationAuthOptions } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';
import { safeJSONparse } from '@/lib/util';

export const AuthContext = createContext<{
  authOption: AuthOption | null;
  authValue: string | null;
  isAuthHidden: boolean;
  authOptions: AuthOption[];
  updateAuthValue: (v: string) => void;
  updateAuthOption: (c: AuthOption) => void;
  toggleHideAuth: () => void;
}>({
  authOption: null,
  authValue: null,
  isAuthHidden: false,
  authOptions: [],
  updateAuthValue: () => {},
  updateAuthOption: () => {},
  toggleHideAuth: () => {},
});

type AuthProviderProps = {
  operation: ApiOperation;
  children: ReactNode;
};

const AUTH_SESSION_STORAGE_KEY = 'auth';

const persistedAuthState = (fallback: AuthState) => {
  const state = safeJSONparse<Partial<AuthState>>(
    sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY) ?? '{}',
    {},
  );
  const { apikey, basic, ...persistedState } = state;
  return { ...fallback, ...persistedState } as AuthState;
};

export const AuthProvider = ({ operation, children }: AuthProviderProps) => {
  const authOptions = useMemo(() => operationAuthOptions(operation), [operation]);

  const [authState, setAuthState] = useState<AuthState>(
    persistedAuthState({
      current: authOptions[0] ?? 'apikey',
      hidden: false,
      apikey: '',
      basic: '',
    }),
  );

  useEffect(() => {
    sessionStorage.setItem(
      AUTH_SESSION_STORAGE_KEY,
      JSON.stringify({ current: authState.current, hidden: authState.hidden }),
    );
  }, [authState]);

  useEffect(() => {
    if (authOptions.length > 0 && !authOptions.includes(authState.current)) {
      setAuthState((s) => ({ ...s, current: authOptions[0] }));
    }
  }, [authOptions, authState]);

  const updateAuthOption = useCallback(
    (o: AuthOption) => {
      setAuthState((s) => ({ ...s, current: o }));
    },
    [setAuthState],
  );

  const toggleHideAuth = useCallback(() => {
    setAuthState((s) => ({ ...s, hidden: !s.hidden }));
  }, [setAuthState]);

  const updateAuthValue = useCallback(
    (value: string) => {
      setAuthState((s) => ({ ...s, [authState.current]: value }));
    },
    [authState, setAuthState],
  );

  const contextValue = useMemo(
    () => ({
      authOption: authOptions.includes(authState.current) ? authState.current : null,
      authValue: authOptions.includes(authState.current) ? authState[authState.current] : null,
      isAuthHidden: authState.hidden,
      authOptions,
      updateAuthValue,
      updateAuthOption,
      toggleHideAuth,
    }),
    [authOptions, authState, updateAuthValue, updateAuthOption, toggleHideAuth],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
