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
      // this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC);

      window.provider = this.provider;
      this.contract = new ethers.Contract(address, Contract.abi, this.provider);
    }
    // this.balance = 0;
  }

  async mint(to, amount) {
    this.mintStatus = 'minting';
    this.reset();
    await sleep(3000);
    this.mintStatus = 'mint';
    this.reset();
    // const tx = await this.contract.mint(to, amount);
    // return tx;
  }

  async balanceOf(address) {
    const balance = await this.contract.balanceOf(address);
    return balance.toString();
  }

  async update(callback) {
    if (callback) {
      this.rgvSetState = callback;

      window.c = callback;
      window.a = this;
    }
    if (this.rgvSetState) {
      this.refreshing = true;
      this.reset();
      await Promise.all([
        // this.contract.baseExtension().then((x) => { this.baseExtension = x; }),
        this.contract.cost().then((x) => {
          this.cost = ethers.utils.formatEther(x);
        }),
        this.contract.maxSupply().then((x) => { this.maxSupply = x.toString(); }),
        this.contract.totalSupply().then((x) => { this.totalSupply = x.toString(); }),
        this.contract.balanceOf(this.contract.address)
          .then((x) => { this.balance = x.toString(); }),
      ]).catch((e) => {
        console.log(e);
      });
      this.refreshing = false;
      this.reset();
    }
  }

  reset() {
    this.rgvSetState({ rgv: this });
  }
}
