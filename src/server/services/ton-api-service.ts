import {
  calculatePricePercentageDifference,
  getAmount,
} from '../../utils/number';

export class TonApiService {
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
  async getJettonByAccount(jettonAddress: string) {
    const response = await (
      await fetch(
        `${this.host}/accounts/${this.walletAddress}/jettons/${jettonAddress}/history?limit=25`,
        {
          headers: {
            // Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
    ).json();

    return response.events;
  }
  async getJettonInfoByAccount(
    jettonAddress: string,
    jettonCurrentPrice: number,
    walletAddress: string
  ) {
    let jettonTransactions = await this.getJettonByAccount(jettonAddress);
    const transactionsTimeStamp: any[] = [];

    jettonTransactions = jettonTransactions
      .map((item: any, index: number) => {
        const action = item.actions[0];
        const amount = getAmount(
          action.JettonTransfer.amount,
          action.JettonTransfer.jetton.decimals
        );
        if (action.JettonTransfer.recipient.address === walletAddress) {
          transactionsTimeStamp.push(item.timestamp);
        }
        return {
          amount,
          timeStamp: item.timestamp,
          recipient: action.JettonTransfer.recipient.address,
          sender: action.JettonTransfer.sender.address,
          action,
        };
      })
      .sort((a: any, b: any) => b.value - a.value);

    const jettonRates = await this.getJettonRateAtDate(
      transactionsTimeStamp,
      jettonAddress
    );
    return jettonTransactions.map((transaction: any) => {
      const rateObject = jettonRates.find(
        (rate: any) => rate?.timeStamp === transaction?.timeStamp
      );

      if (rateObject) {
        const diff = calculatePricePercentageDifference(
          Number(rateObject.rate),
          Number(jettonCurrentPrice)
        );

        return {
          ...transaction,
          ...rateObject,
          diff,
        };
      }
    });
  }

  async getJettonRateAtDate(
    transactionsTimeStamp: number[],
    jettonAddress: string
  ) {
    const promiseMap = transactionsTimeStamp.map(async (timestamp) => {
      return await fetch(
        `${this.host}/rates/chart?token=${jettonAddress}&currency=usd&end_date=${timestamp}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (!response.points || response.points.length === 0) {
            return null;
          }

          let closestRate = null;
          let smallestDifference = Number.MAX_SAFE_INTEGER;
          const rateAddressMap = {};
          for (const point of response.points) {
            const [pointTimestamp, rate] = point;
            const difference = Math.abs(pointTimestamp - timestamp);

            if (difference < smallestDifference) {
              smallestDifference = difference;
              closestRate = rate;
            }
          }
          return { timeStamp: timestamp, rate: closestRate };
        });
    });
    const results = await Promise.all(promiseMap);
    return results;
  }

  async getJettonRates(
    transactionsTimeStamp: number[],
    jettonAddress: string
  ): Promise<Map<string, number>> {
    const jettonRatesMap = new Map<string, number>();

    for (const timestamp of transactionsTimeStamp) {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const differenceInSeconds = nowInSeconds - timestamp;
      const differenceInDays = differenceInSeconds / (3600 * 24);

      const response = await fetch(
        `${this.host}/rates/chart?token=${jettonAddress}&currency=usd&history&start_date=${timestamp}&end_date=${nowInSeconds}&points_count=3`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json());

      if (response.points[1 + parseInt(differenceInDays.toString())]) {
        const rate =
          response.points[1 + parseInt(differenceInDays.toString())][1];
        jettonRatesMap.set(jettonAddress, rate);
      }
    }

    return jettonRatesMap;
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
