import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { useRGV } from '../hooks/useRGV';

export function BodySwitcher() {
  const { chainId, account } = useWeb3React();
  const { rgv } = useRGV();
  let validWallet = false;
  if (chainId && account) {
    if (chainId?.toString() === process.env.CHAIN_ID) validWallet = true;
  }

  if (rgv.refreshing) {
    return <div />;
  }

  if (rgv.isFinished) {
    return (
      <div className="body congrats">
        Miniting Finished!
      </div>
    );
  }

  if (rgv.refreshing || !validWallet) {
    return <div />;
  }

  if (rgv.mintStatus === 'minting') {
    return (
      <>
        <div style={{ flex: 100 }} />
        <div className="body">
          <h3>Please wait... Miniting in Progress</h3>
        </div>
      </>
    );
  }
  if (rgv.mintStatus === 'mintError') {
    const message = rgv.fundsError ? 'Insufficient Funds!' : 'Something went wrong';
    return (
      <div className="body" style={{ color: '#FF80AB' }}>
        <h3>{message}</h3>
        <h3>Please refresh the page</h3>
        <div className="spacerBig" />
        <button
          type="button"
          className="mintButton"
          onClick={() => {
            window.location.reload();
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  if (rgv.mintStatus === 'mintSuccess') {
    return <MintMore rgv={rgv} />;
  }

  return (
    <div className="body">
      <NFTCount account={account} />
      <MintSection rgv={rgv} />
    </div>
  );
}

function NFTCount({ account }) {
  const { rgv } = useRGV();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (rgv.refreshing) return;
    rgv.balanceOf(account).then(setBalance);
  }, [account]);
  // rgv.balanceOf(rgv.account);
  if (balance === '0') {
    return (
      <h3>How many NFTs you like to mint?</h3>
    );
  }
  return (
    <>
      <h4>
        You already own
        {' '}
        <span>{ balance}</span>
        {' '}
        NFTs
      </h4>
      <h3>How many more NFTs you like to mint?</h3>
    </>
  );
}

function MintSection() {
  const { rgv } = useRGV();
  const [count, setCount] = useState(1);
  return (
    <div>
      <div className="mintSection">
        <button
          type="button"
          className="countButton"
          onClick={() => {
            setCount((x) => {
              if (x > 1) return (x - 1); return x;
            });
          }}
        >
          <div>-</div>
        </button>
        <h2 style={{ width: 100 }}>
          {count }
        </h2>
        <button
          type="button"
          className="countButton"
          onClick={() => {
            setCount((x) => {
              if (x < rgv.maxSupply - rgv.totalSupply) return (x + 1); return x;
            });
          }}
        >
          {' '}
          <div>+</div>
        </button>
      </div>
      <button type="button" className="mintButton" onClick={() => { rgv.mint(count); }}>Mint Now</button>
    </div>
  );
}

function MintMore({ rgv }) {
  let link = 'https://opensea.io';
  if (process.env.CHAIN_ID !== '1') {
    link = 'https://testnets.opensea.io';
  }
  return (
    <div className="body">
      <div className="congrats">
        Congratulations!
      </div>
      <div className="spacerMed" />
      <button
        type="button"
        className="mintButton"
        onClick={() => {
          rgv.resetMint();
        }}
      >
        Mint More
      </button>
      <div className="spacerBig" />
      <div className="opensea">
        <a href={link} target="_blank" rel="noreferrer">
          View minted images once revealed on OpenSea
          {' '}
          <span>&#10230;</span>
        </a>
      </div>
    </div>
  );
}
