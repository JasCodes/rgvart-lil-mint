import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../components/wallet/connectors';

export default function Home() {
  const {
    active, account, library, connector, activate, deactivate,
  } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <button type="button" onClick={connect}>Connect to MetaMask</button>
      {active ? (
        <span>
          Connected with
          {' '}
          <b>{account}</b>
        </span>
      ) : <span>Not connected</span>}
      <button type="button" onClick={disconnect}>Disconnect</button>
    </div>
  );
}
