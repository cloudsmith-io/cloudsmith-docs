// Copyright 2026 Cloudsmith Ltd

import { useEffect, useState } from 'react';

export type ModifierKey = {
  symbol: string;
  label: string;
};

/**
 * Detects if the device has a keyboard as primary input.
 * Returns false for touch-only devices (phones, tablets without keyboards).
 */
const hasKeyboardInput = (): boolean => {
  if (typeof window === 'undefined') return false;

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;

  return hasFinePointer && hasHover;
};

/**
 * Detects if the primary platform is macOS.
 */
const isMac = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return navigator.platform?.toUpperCase().includes('MAC') ?? false;
};

/**
 * Returns whether keyboard shortcut hints should be displayed.
 * Returns null during SSR/before hydration to avoid hydration mismatch.
 * Returns false on touch-only devices where keyboard shortcuts aren't useful.
 */
export const useShowKeyboardHints = (): boolean | null => {
  const [showHints, setShowHints] = useState<boolean | null>(null);

  useEffect(() => {
    setShowHints(hasKeyboardInput());
  }, []);

  return showHints;
};

/**
 * Returns the appropriate modifier key for the current platform.
 * Returns null during SSR/before hydration.
 *
 * - macOS: ⌘ (Command)
 * - Windows/Linux: Ctrl (Control)
 */
export const useModifierKey = (): ModifierKey | null => {
  const [modifierKey, setModifierKey] = useState<ModifierKey | null>(null);

  useEffect(() => {
    setModifierKey(isMac() ? { symbol: '⌘', label: 'Command' } : { symbol: 'Ctrl', label: 'Control' });
  }, []);

  return modifierKey;
};
