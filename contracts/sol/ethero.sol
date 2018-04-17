pragma solidity ^0.4.21;

contract Ethero {
  address public owner;
  address[] public players;

  modifier restricted () {
    require(msg.sender == owner);
    _;
  }

  function Ethero() public {
    owner = msg.sender;
  }

  function enter() public payable {
    // let's exclude the owner from being a participant
    require(msg.sender != owner);
    require(msg.value >= 0.01 ether);

    players.push(msg.sender);
  }

  function pickWinner() public restricted {
    uint index = random() % players.length;
    // compiler whines if using 'this.balance'
    players[index].transfer(address(this).balance);

    // reset the list of participants
    players = new address[](0);
  }

  function random() private view returns (uint256) {
    // psuedo-random
    return uint(keccak256(block.difficulty, now, players));
  }

  function getPlayers() public view returns (address[]) {
    return players;
  }
}
