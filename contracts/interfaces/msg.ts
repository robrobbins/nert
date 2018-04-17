type dataProperty = number | any[]

export default interface Msg {
  sender: string;
  data?: dataProperty;
  gas?: number;
  value?: number;
}
