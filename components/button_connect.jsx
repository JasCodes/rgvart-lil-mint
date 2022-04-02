import React from 'react';

import { useWeb3React } from '@web3-react/core';
import { injected } from './connectors';

export function ButtonConnect() {
  const { activate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <button type="button" className="connect" onClick={connect}>Connect</button>
  );
}
