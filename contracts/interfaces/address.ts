import Transfer from './functions/transfer'
import Send from './functions/send'

export default interface Address {
  // TODO unsure of this type away from .sol. Clarify
  value: number | string;
  balance: number;
  transfer: Transfer;
  send: Send;
}
