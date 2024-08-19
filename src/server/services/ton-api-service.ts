import {
  calculatePricePercentageDifference,
  getAmount,
} from '../../utils/number';

export class TonApiService {
  private tonAPIHost = 'https://tonapi.io/v2/';
  private dexScreenerAPIHost = 'https://api.dexscreener.io/';
  private walletAddress = '';

  public readonly refreshIntervalMs = 9 * 60 * 1000;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  async getJettonByAccount() {
    const response = await (
      await fetch(
        `${this.tonAPIHost}/accounts/${this.walletAddress}/jettons/0:6d0e662008a93779c435c7e8f408b6519cf632695edc077dda774dfa40df8713`,
        {
          headers: {
            // Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
    ).json();

    return response;
  }

  async getRTDexData() {
    try {
      //TODO: Change to the correct par ID
      const response = await fetch(
        `${this.dexScreenerAPIHost}latest/dex/pairs/ton/eqdliykw-ryo0ceppthzxbht97niu9bohlwidsofcj6qv870`,
        {
          headers: {
            Accept: '*/*',
          },
        }
      );
      return response.json();
    } catch (error) {
      console.log('error', error);
    }
  }
}
