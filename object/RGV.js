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
    this.mintStatus = 'mintStart';
    this.isFinished = false;
    if (typeof window !== 'undefined') {
      this.provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC);

      this.contract = new ethers.Contract(address, Contract.abi, this.provider);
      // window.ii = this.isFinished;
    }
    // this.balance = 0;
  }

  resetMint() {
    this.mintStatus = 'mintStart';
    this.updateState();
  }

  async mint(mintAmount) {
    try {
      const signer = this.contract.connect(
        (new ethers.providers.Web3Provider(window.ethereum)).getSigner(),
      );
      this.mintStatus = 'minting';

      this.updateState();
      const tx = await signer.mint(mintAmount, { value: this.costBig.mul(mintAmount) });
      const r = await tx.wait();
      this.mintStatus = 'mintSuccess';
      this.updateState();
      return r;
    } catch (e) {
      console.log(e);
      this.fundsError = e.message.includes('insufficient funds');
      this.mintStatus = 'mintError';
      this.updateState();
    }
    return null;
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
    this.contract.name().then((x) => { this.name = x.toString(); }),
    this.contract.maxSupply().then((x) => {
      this.maxSupplyBig = x;
      this.maxSupply = x.toString();
    }),
    this.contract.totalSupply().then((x) => {
      this.totalSupplyBig = x;
      this.totalSupply = x.toString();
    }),
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
      try {
        this.refreshing = true;
        this.updateState();
        await Promise.all(this.updatePromises());
        this.refreshing = false;
        this.updateState();
      } catch (e) {
        console.log(e);
      }
    }
  }

  updateState() {
    this.isFinished = this.maxSupplyBig?.eq(this.totalSupply);
    this.rgvSetState({ rgv: this });
  }
}
