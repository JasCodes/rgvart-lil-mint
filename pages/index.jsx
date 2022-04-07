import React, { useState, useEffect } from 'react';
import { BodyHeader } from '../components/body_header';
import { BodySwitcher } from '../components/body_switcher';
import { Header } from '../components/header';
import { RGVProvider } from '../hooks/useRGV';
import { RGV } from '../object/RGV';
// eslint-disable-next-line import/no-unresolved

export default function Home() {
  console.log('contract address', process.env.CONTRACT_ADDRESS, process.env.CHAIN_ID);
  const [rgv, setrgv] = useState({ rgv: new RGV(process.env.CONTRACT_ADDRESS) });

  useEffect(() => {
    // setTimeout(() => {
    rgv.rgv.update(setrgv);
    // }, 2000);
  }, []);

  return (
    <RGVProvider value={rgv}>
      <div className="bg">
        <Header />
        <BodyHeader />
        <BodySwitcher />
      </div>
    </RGVProvider>
  );
}
