import React, { useContext } from 'react';
import { RGV } from '../object/RGV';

const RGVContext = React.createContext({
  rgv: new RGV(''),
});

export const RGVProvider = RGVContext.Provider;

export const useRGV = () => {
  const rgv = useContext(RGVContext);
  return rgv;
};
