// TODO same as transfer - what about the 'forwarded' 2300 gas stipend?
// TODO known to return false on failure, is true guaranteed on success?

export default interface Send {
  (amount: number): boolean;
}
