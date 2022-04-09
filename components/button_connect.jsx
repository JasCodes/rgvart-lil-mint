import React, { useEffect } from 'react';

import { useWeb3React } from '@web3-react/core';
import { injected } from './connectors';

export function ButtonConnect() {
  const {
    activate, account, chainId,
  } = useWeb3React();

  // const [address, setAddress] = useState(account);

  useEffect(() => {
    console.log('account', account);
    // setAddress(account);
  }, [account]);
  async function connect() {
    try {
      await activate(injected);
      // localStorage.setItem('isWalletConnected', true);
    } catch (ex) {
      console.log(ex);
    }
  }
  if (chainId && chainId.toString() !== process.env.CHAIN_ID) {
    let message;
    if (process.env.CHAIN_ID === '1') {
      message = 'Ethereum Mainnet';
    } else {
      message = 'Rinkeby Testnet';
    }
    return (
      <button type="button" className="connect-condensed">
        Please connect to
        <br />
        { message }
      </button>
    );
  }
  if (typeof window !== 'undefined') {
    if (typeof window.ethereum === 'undefined') {
      // const dappUrl = 'rgv.surge.sh';
      // const dappUrl = 'rgv.surge.sh';
      const metamaskAppDeepLink = `https://metamask.app.link/dapp/${process.env.DEPLOY_URL}`;
      return (
        <a href={metamaskAppDeepLink}>
          <button
            type="button"
            className="connect"
          >
            Connect
          </button>
        </a>
      );
    }
  }

  if (account) {
    const message = `${account.substring(0, 8)} ... ${account.substring(account.length - 8)}`;
    return <button type="button" className="connect-condensed">{ message }</button>;
  }

  return (
    <button type="button" className="connect" onClick={connect}>Connect</button>
  );
}
