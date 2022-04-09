import React, { useState, useEffect } from 'react';
import { Body } from '../components/body';
import { BodySwitcher } from '../components/body_switcher';
import { Header } from '../components/header';
import { RGVProvider } from '../hooks/useRGV';
import { RGV } from '../object/RGV';
// eslint-disable-next-line import/no-unresolved

export default function Home() {
  // console.log('contract address', process.env.CONTRACT_ADDRESS, process.env.CHAIN_ID);
  const [rgv, setrgv] = useState({ rgv: new RGV(process.env.CONTRACT_ADDRESS) });

  useEffect(() => {
    rgv.rgv.update(setrgv);
  }, []);

  return (
    <RGVProvider value={rgv}>
      <div className="bg">
        <Header />
        <div style={{ flex: 100 }} />
        <Body />
        <BodySwitcher />
        <div style={{ flex: 400 }} />
      </div>
    </RGVProvider>
  );
}
