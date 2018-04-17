import Basic from '../abstracts/tokens/erc20-basic'
import Balances from '../interfaces/balances'
import Msg from '../interfaces/msg'

// TODO clarify how to handle the solidity global msg
// TODO clarify the lifecycle of instantiated classes. RE: immutability (TS readonly)
declare const msg:Msg

export default class BasicToken extends Basic {
  // TODO clarify the need of public visibility on these as they have getters (not needed IMO, but may be convention)
  constructor(public totalSupply_: number = 0, private balances: Balances = {}) {
    super()
  }

  // see https://github.com/OpenZeppelin/zeppelin-solidity/pull/666
  totalSupply() {
    return this.totalSupply_
  }

  // NOTE: not using the zeppelin pre-dangling underscores on args here. TODO clarify
  // TODO we could also deal with the msg global by just passing the sender here...
  transfer(to: string, value: number) {
    // TODO if a requirement is not met should we return false, halt, what? Solidity docs
    // say that it should throw, but since we must return a bool, I am choosing the first. Clarify

    // TODO to make the solidiy address(0) work we would need to know, what, the owner?
    // using '0x0' as a placeholder for now. Clarify
    if (to === '0x0') return false
    // the open zeppelin has no check for sender membership, is there a constraint already in place? TODO clarify
    if (!(msg.sender in this.balances)) return false
    if (value > this.balances[msg.sender]) return false

    // open zep uses a 'safeMath' module to assure positive numbers and throw if otherwise, we could too TODO
    // NOTE: still unsure about 'throwing' as we need to determine what outcome we want, it may be we want a set
    // of custom errors that pertain to contracts
    this.balances[msg.sender] -= value
    // the same AFA membership check on `to`. TODO clarify if we should
    if (!(to in this.balances)) return false // TODO should we add an entry?
    this.balances[to] += value
    this.Transfer(msg.sender, to, value)
    return true
  }

  balanceOf(owner: string) {
    return this.balances[owner]
  }
}
