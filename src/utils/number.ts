/**
 * Calculates the amount based on the balance and decimals.
 *
 * @param balance - The balance value.
 * @param decimals - The number of decimal places.
 * @returns The calculated amount.
 */
export function getAmount(balance: number, decimals: number): number {
  return Math.floor(balance / 10 ** decimals);
}

/**
 * Calculates the percentage difference between two values.
 *
 * @param oldPrice - The buy price.
 * @param currentPrice - The current price.
 * @returns The percentage difference between the two values.
 */
export function calculatePricePercentageDifference(
  buyPrice: number,
  currentPrice: number
): string {
  if (currentPrice < buyPrice) {
    return (-((buyPrice - currentPrice) / buyPrice) * 100).toFixed(2);
  }

  return (((currentPrice - buyPrice) / buyPrice) * 100).toFixed(2);
}
