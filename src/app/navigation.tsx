'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>('closed');
  const toggleNavigation = (nextState: NavigationState) =>
    setNavigationState((currentState) => (currentState === nextState ? 'closed' : nextState));

  return (
    <NavigationContext.Provider value={{ navigationState, setNavigationState, toggleNavigation }}>
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
  const previousPathname = useRef(pathname);

  // Close the navigation when the pathname changes
  useEffect(() => {
    setNavigationState('closed');

    if (previousPathname.current !== pathname) {
      // Disable smooth scroll so the top-reset is instant, then restore it
      document.documentElement.style.scrollBehavior = 'auto';
      window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        window.requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = '';
        });
      });
    }

    previousPathname.current = pathname;
  }, [pathname, setNavigationState]);

  return null;
};

type NavigationState = 'closed' | 'globalNav' | 'sideNav';

interface NavigationContextType {
  navigationState: NavigationState;
  setNavigationState: (state: NavigationState) => void;
  toggleNavigation: (state: NavigationState) => void;
}
