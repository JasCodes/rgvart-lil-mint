import React from 'react';
import { useRGV } from '../hooks/useRGV';

export function Body() {
  const { rgv } = useRGV();

  if (rgv.refreshing) {
    return (
      <div className="center refresh">
        REFRESHING ...
      </div>
    );
  }
  // <h3>Love is Love - NFT Collection</h3>
  return (
    <div className="body">

      <h3>{rgv.name}</h3>
      <h2 style={{ lineHeight: '38px' }}>
        { rgv.totalSupply}
        {' '}
        /
        {' '}
        { rgv.maxSupply}

      </h2>
      <div className="spacer" />
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
