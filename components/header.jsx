import React from 'react';
import { ButtonConnect } from './button_connect';
import { Logo } from './logo';

export function Header() {
  return (
    <header>
      <Logo />
      <ButtonConnect />
    </header>
  );
}
