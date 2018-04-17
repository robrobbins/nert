/*
 * see https://github.com/ethereum/EIPs/issues/20
 */

import Basic from './erc20-basic'

export default abstract class ERC20 extends Basic {
  abstract allowance(owner: string, spender: string): number;
  abstract transferFrom(from: string, to: string, value: number): boolean;
  abstract approve(spender: string, value: number): boolean;
  // TODO clarify solidity event.
  Approval(owner: string, spender: string, value: number): void {
    console.log(`owner ${owner} approves ${spender} for ${value}`)
  }
}
