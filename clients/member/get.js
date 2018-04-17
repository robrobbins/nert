// a simple web3 direct script to 'wire up' the fetch of a member contract. this will be removed
// after in favor of routing thru the api endpoint for the same

window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
window.web3.eth.defaultAccount = window.web3.eth.accounts[0]


document.getElementById('submit').addEventListener('click', e => {
const contract = window.web3.eth.contract(window.memberABI),
  address = document.getElementById('address').value;

  if (address) {
    const member = contract.at(address)

    if (member) {
      let firstName, lastName, title, foo
      // our sol just has full name coming back in an array
      [firstName, lastName] = member.getFullName()
      document.getElementById('firstName').innerText = firstName
      document.getElementById('lastName').innerText = lastName
      document.getElementById('title').innerText = member.getTitle()
      document.getElementById('foo').innerText = member.getFoo()
    }
  }
})


