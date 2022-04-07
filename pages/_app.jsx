import React from 'react';
import '../styles/globals.css';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import Head from 'next/head';

function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="RGVart - Mint Love is Love NFT" />
        <meta property="og:site_name" content="RGVart - Mint Love is Love NFT" />
        <meta itemProp="name" content="RGVart - Mint Love is Love NFT" />
        <meta property="og:url" content="https://mint.rgvart.io" />
        <meta property="og:image" content="https://rgvart.io/images/welcome-bg.jpg" />
        <meta itemProp="image" content="https://rgvart.io/images/welcome-bg.jpg" />
        <meta
          property="og:description"
          content="RGVart.io is primary market place of NFTs, collaborates with artists to launch their NFT projects , make them available for minting to the community of interest."
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />

        <link rel="icon" type="image/png" href="favicon.png" />

        <title>RGVart - Mint Love is Love</title>
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
