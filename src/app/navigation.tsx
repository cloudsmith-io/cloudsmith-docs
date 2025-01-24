'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>('closed');
  const toggleNavigation = (nextState: NavigationState) =>
    setNavigationState((currentState) => (currentState === nextState ? 'closed' : nextState));

  return (
    <NavigationContext.Provider
      value={{
        navigationState,
        setNavigationState,
        toggleNavigation,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return context;
};

export const NavigationEvents = () => {
  const pathname = usePathname();
  const { setNavigationState } = useNavigation();

  // Close the navigation when the pathname changes
  useEffect(() => {
    setNavigationState('closed');
  }, [pathname, setNavigationState]);

  return null;
};

type NavigationState = 'closed' | 'global' | 'local';

interface NavigationContextType {
  navigationState: NavigationState;
  setNavigationState: (state: NavigationState) => void;
  toggleNavigation: (state: NavigationState) => void;
}
