
import React, { createContext, useContext } from 'react';
import { ModuleContextData } from './types';

const ModuleContext = createContext<ModuleContextData | null>(null);

export const useModuleContext = (): ModuleContextData => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModuleContext must be used within ModuleContextProvider');
  }
  return context;
};

export { ModuleContext };
