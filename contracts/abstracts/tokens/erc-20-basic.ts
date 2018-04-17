/*
 * see https://github.com/ethereum/EIPs/issues/179
 */

export default abstract class ERC20Basic {
  abstract totalSupply(): number;
  abstract balanceOf(who: string): number;
  abstract transfer(to: string, value: number): boolean;
  // TODO clarify solidity event. This may be he 0x LogEntryEvent
  Transfer(from: string, to: string, value: number): void {
    console.log(`transfer ${value} to ${to} from ${from}`)
  }
}
