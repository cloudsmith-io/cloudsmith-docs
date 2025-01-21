'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <NavigationContext.Provider value={{ isOpen, setIsOpen }}>{children}</NavigationContext.Provider>;
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
  const { setIsOpen } = useNavigation();

  // Close the navigation when the pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return null;
};

interface NavigationContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
