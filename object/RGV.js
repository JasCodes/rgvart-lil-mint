import { ethers } from 'ethers';
import Contract from '../RGVERC721.json';

export class RGV {
  constructor(address) {
    this.refreshing = true;
    if (typeof window !== 'undefined') {
      // this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/7RLgccMpIwnw9TQU83cEoPoEO1HW_Li9');

      window.provider = this.provider;
      this.contract = new ethers.Contract(address, Contract.abi, this.provider);
    }
    // this.balance = 0;
  }

  async update(callback) {
    if (callback) {
      this.rgvSetState = callback;

      window.c = callback;
      window.a = this;
    }
    if (this.rgvSetState) {
      this.refreshing = true;
      this.rgvSetState({ rgv: this });
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
      this.rgvSetState({ rgv: this });
    }
  }
}
