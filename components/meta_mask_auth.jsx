import React, { useEffect, useState } from 'react';
// import styles from './metamask-auth.module.css';

function isMobileDevice() {
  return true;
  // return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert('Get MetaMask!');
    return;
  }

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        onConnected(account);
        return;
      }

      if (isMobileDevice()) {
        await connect(onConnected);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
}

export function MetaMaskAuth({ onAddressChanged }) {
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);

  return userAddress ? (
    <div>
      Connected with
      {' '}
      <Address userAddress={userAddress} />
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  );
}

function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = 'rgv.surge.sh'; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    // const dappUrl = 'metamask-auth.ilamanov.repl.co'; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${dappUrl}`;
    return (
      <a href={metamaskAppDeepLink}>
        <button type="button">
          Connect to MetaMask
        </button>
      </a>
    );
  }

  return (
    <button type="button" className="connect" onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}

function Address({ userAddress }) {
  return (
    <span>
      {userAddress.substring(0, 5)}
      …
      {userAddress.substring(userAddress.length - 4)}
    </span>
  );
}
