import {
  Account,
  ConnectAdditionalRequest,
  SendTransactionRequest,
  TonProofItemReplySuccess,
} from '@tonconnect/ui-react';
import '../../patch-local-storage-for-github-pages';

export class TonApiService {
  private localStorageKey = 'demo-api-access-token';

  private host = 'https://tonapi.io/v2/';
  private walletAddress = '';

  public readonly refreshIntervalMs = 9 * 60 * 1000;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  async getAccountJettons() {
    const response = await (
      await fetch(`${this.host}/accounts/${this.walletAddress}/jettons`, {
        headers: {
          // Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      })
    ).json();

    return response.balances;
  }

  async getAccountJettonsInfo() {
    const jettons = await this.getAccountJettons();
    const jettonsAddresses = jettons.map((item: any) => item.jetton.address);
    const rates = await this.getJettonsRates(jettonsAddresses);
    return jettons.map((item: any) => {
      return {
        ...item,
        rate: rates[item.jetton.address].prices.USD ?? null,
      };
    });
  }

  async getJettonsRates(jettonsAdresses: string[]) {
    const response = await (
      await fetch(
        `${this.host}/rates?tokens=${jettonsAdresses}&currencies=ton,usd`,
        {
          headers: {
            // Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
    ).json();

    return response.rates;
  }

  // async createJetton(
  //   jetton: CreateJettonRequestDto
  // ): Promise<SendTransactionRequest> {
  //   return await (
  //     await fetch(`${this.host}/api/create_jetton`, {
  //       body: JSON.stringify(jetton),
  //       headers: {
  //         Authorization: `Bearer ${this.accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'POST',
  //     })
  //   ).json();
  // }
}
