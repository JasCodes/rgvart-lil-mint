import React from 'react';
import { ButtonConnect } from './button_connect';
// import { MetaMaskAuth } from './meta_mask_auth';
import { Logo } from './logo';

export function Header() {
  return (
    <header>
      <Logo />
      <ButtonConnect />
    </header>
  );
}
// {/* <ButtonConnect /> */}
