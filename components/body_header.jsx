import React, { useEffect } from 'react';
import { useRGV } from '../hooks/useRGV';

export function BodyHeader() {
  const { rgv } = useRGV();

  if (rgv.refreshing) {
    return (
      <div className="center">
        <h1>REFRESHING...</h1>
      </div>
    );
  }
  return (
    <div className="bodyHeader">

      <h3>Love is Love - NFT Collection</h3>
      <h2 style={{ lineHeight: '38px' }}>
        { rgv.totalSupply}
        {' '}
        /
        {' '}
        { rgv.maxSupply}

      </h2>
      <br />
      <h4>
        1 NFT costs
        {' '}
        <span>
          {rgv.cost }
        </span>
        {' '}
        ETH
      </h4>
      <h6 style={{ lineHeight: '10px' }}>EXCLUDING GAS FEE</h6>
    </div>
  );
}
// {/* <ButtonConnect /> */}
