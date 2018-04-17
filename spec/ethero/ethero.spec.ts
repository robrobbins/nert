import * as ganache from 'ganache-cli'
import Web3 from 'web3'
// symlink? copy types to @types? TODO
import { Contract } from '../../node_modules/web3/types.d'
import compile from '../../contracts/sol/compiler'

// TODO use the web3 IProvider?
const provider:any = ganache.provider()

const web3 = new Web3(provider),
  // can't destruture because interface is reserved...
  compiled = compile('ethero')

// TODO web3 1 has typings, why cant i use their Contract?
let accounts:string[], ethero:Contract

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  ethero = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({ data: compiled.bytecode, arguments: [] })
    .send({ from: accounts[0], gas: '1000000' })

  ethero.setProvider(provider)
})

describe('Ethero', () => {
  // test modifiers, requires, asserts first...
  describe('expected failures', () => {
    // have to use try/catch to account for VM revert
    it('does not allow the 0 account to enter', async () => {
      try {
        await ethero.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('0.01', 'ether'),
        })

        // this should not run...
        expect(false).toBe(true)

      } catch(e) {
        expect(e).toBeTruthy()

        const players = await ethero.methods.getPlayers().call({
          from: accounts[0],
        })

        expect(players.length).toBe(0)
      }
    })

    it('does not allow entry with less than 0.01eth', async () => {
      try {
        await ethero.methods.enter().send({
          from: accounts[1],
          value: web3.utils.toWei('0.009', 'ether'),
        })

        // this should not run...
        expect(false).toBe(true)

      } catch(e) {
        expect(e).toBeTruthy()

        const players = await ethero.methods.getPlayers().call({
          from: accounts[1],
        })

        expect(players.length).toBe(0)
      }
    })

    it('only allows owner to pick winner', async () => {
      try {
        await ethero.methods.pickWinner().send({
          from: accounts[1],
        })

        // this should not run...
        expect(false).toBe(true)

      } catch(e) {
        expect(e).toBeTruthy()
      }
    })
  })

  it('has an address, has deployed to ganache', () => {
    expect(ethero.options.address).toBeTruthy()
  })

  it('allows players to enter', async () => {
    await ethero.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.01', 'ether'),
    })

    await ethero.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    const players = await ethero.methods.getPlayers().call({
      from: accounts[1],
    })

    expect(players.length).toBe(2)
    expect(players[0] === accounts[1]).toBe(true)
    expect(players[1] === accounts[2]).toBe(true)
  })

  it('picks a winner, sends eth, resets the players array', async () => {
    // one of these 2 will win...
    let p1Balance = await web3.eth.getBalance(accounts[3]),
      p2Balance = await web3.eth.getBalance(accounts[4])

    // ts types are a bit crossed up about these balances, TODO confirm/fix...
    p1Balance = parseInt(String(p1Balance))
    p2Balance = parseInt(String(p2Balance))

    // balances will be less now...
    await ethero.methods.enter().send({
      from: accounts[3],
      value: web3.utils.toWei('1', 'ether'),
    })

    await ethero.methods.enter().send({
      from: accounts[4],
      value: web3.utils.toWei('2', 'ether'),
    })

    let p1NewBalance = await web3.eth.getBalance(accounts[3]),
      p2NewBalance = await web3.eth.getBalance(accounts[4])

    p1NewBalance = parseInt(String(p1NewBalance))
    p2NewBalance = parseInt(String(p2NewBalance))

    // TODO they _are_ strings already but type defs seem to be crossed up here?
    expect(p1NewBalance).toBeLessThan(p1Balance)
    expect(p2NewBalance).toBeLessThan(p2Balance)

    await ethero.methods.pickWinner().send({ from: accounts[0] })

    // one of the two final alances will be more than the newBalances
    let p1FinalBalance = await web3.eth.getBalance(accounts[3]),
      p2FinalBalance = await web3.eth.getBalance(accounts[4])

    p1FinalBalance = parseInt(String(p1FinalBalance))
    p2FinalBalance = parseInt(String(p2FinalBalance))

    const p1Wins = p1FinalBalance > p1NewBalance,
      p2Wins = p2FinalBalance > p2NewBalance

    // not going to try to accomodate for all costs
    if (p1Wins) expect(p1FinalBalance >= p1Balance).toBe(true)
    else expect(p2FinalBalance >= p2Balance).toBe(true)

    // players should be cleared
    const players = await ethero.methods.getPlayers().call({
      from: accounts[0],
    })

    expect(players.length).toBe(0)

    // TODO if expanding to allow the ethero contract to keep some small eth, start testing its balance
  })
})
