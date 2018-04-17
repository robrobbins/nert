import compile from './compiler'
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'
import { Contract, HttpProvider } from '../../node_modules/web3/types.d'

const mnemonic = 'grit country ring decorate pause nose helmet bamboo beauty order mushroom choice',
  infura = 'https://rinkeby.infura.io/Ko5AAluYKtxBvIT9kmlo',
  provider:HttpProvider  = new HDWalletProvider(mnemonic, infura),
  web3 = new Web3(provider),
  compiled = compile('ethero');

let accounts:string[], ethero:Contract

// self executor so we can use await vs promise chaining
(async () => {
  accounts = await web3.eth.getAccounts()
  console.log(`Deploying from account ${accounts[0]}`)

  ethero = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({ data: compiled.bytecode, arguments: [] })
    .send({ from: accounts[0], gas: '1000000' })

  console.log(`Deployed at address: ${ethero.options.address}`)
})()
