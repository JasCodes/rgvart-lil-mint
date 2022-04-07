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

  if (rgv.refreshing || !validWallet) {
    return <div />;
  }

  if (rgv.mintStatus === 'minting') {
    return (
      <h3>Please wait... Miniting in Progress</h3>
    );
  }
  if (rgv.mintStatus === 'error') {
    return (
      <h3>Something went wrong. Please refresh.</h3>
    );
  }
  if (rgv.mintStatus === 'mintSuccess') {
    return (
      <h3>Success</h3>
    );
  }

  return (
    <div className="bodyHeader">
      <NFTCount account={account} />
      <MintSection />
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
  if (balance === 0) {
    return (
      <h3>How many NFTs you like to mint?</h3>
    );
  }
  return (
    <>
      <h3>
        You already own
        {' '}
        { balance}
        {' '}
        NFTs
      </h3>
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
          <h2>-</h2>
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
          <h2>+</h2>
        </button>
      </div>
      <button type="button" className="mintButton" onClick={() => { rgv.mint(null, null); }}><h3>Mint Now</h3></button>
    </div>
  );
}
