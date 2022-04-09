import { ethers } from 'ethers';
import Contract from '../RGVERC721.json';

async function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
export class RGV {
  constructor(address) {
    this.refreshing = true;
    this.mintStatus = 'mint';
    if (typeof window !== 'undefined') {
      if (window.ethereum) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC);
      }
      // this.signer = this.provider.getSigner();
      // window.provider = this.provider;
      this.contract = new ethers.Contract(address, Contract.abi, this.provider);
      this.signer = this.contract.connect(this.provider.getSigner());
    }
    // this.balance = 0;
  }

  async mint(mintAmount) {
    this.mintStatus = 'minting';
    this.updateState();
    // await sleep(3000);
    // this.signer.signTransaction();
    return this.signer.mint(mintAmount, { value: this.costBig })
      .then((x) => {
        console.log(x);
        this.mintStatus = 'mintSuccess';
        this.updateState();
      })
      .catch((e) => {
        console.log(e);
        this.mintStatus = 'mintError';
        this.updateState();
      });

    // return tx;
  }

  async balanceOf(address) {
    const balance = await this.contract.balanceOf(address);
    return balance.toString();
  }

  updatePromises = () => [
    // this.contract.baseExtension().then((x) => { this.baseExtension = x; }),
    this.contract.cost().then((x) => {
      this.costBig = x;
      this.cost = ethers.utils.formatEther(x);
    }),
    this.contract.maxSupply().then((x) => { this.maxSupply = x.toString(); }),
    this.contract.totalSupply().then((x) => { this.totalSupply = x.toString(); }),
    this.contract.balanceOf(this.contract.address)
      .then((x) => { this.balance = x.toString(); }),
  ];

  async update(callback) {
    if (callback) {
      this.rgvSetState = callback;
      if (!this.poll) {
        this.poll = setInterval(async () => {
          await Promise.all(this.updatePromises());
          this.updateState();
          console.log('update');
        }, 3000);
      }
      // window.c = callback;
      // window.a = this;
    }
    if (this.rgvSetState) {
      this.refreshing = true;
      this.updateState();
      await Promise.all(this.updatePromises()).then(() => {
        this.refreshing = false;
        this.updateState();
      }).catch((e) => {
        console.log(e);
      });
    }
  }

  updateState() {
    this.rgvSetState({ rgv: this });
  }
}
