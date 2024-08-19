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
