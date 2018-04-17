declare module 'truffle-hdwallet-provider' {
  class HDWalletProvider {
    constructor(mnemonic: string, providerUrl: string, addressIndex?:number, numAddresses?: number);
    responseCallbacks:any;
    notificationCallbacks:any;
    connection: any;
    addDefaultEvents: any;
    on: any;
    removeListener: any;
    removeAllListeners: any;
    reset: any;
    send: any;
  }

  export default HDWalletProvider;
}
