window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
window.web3.eth.defaultAccount = window.web3.eth.accounts[0]

window.computableMember = null

document.getElementById('fetch').addEventListener('click', e => {
const contract = window.web3.eth.contract(window.memberABI),
  address = document.getElementById('address').value;

  if (address) {
    window.computableMember = contract.at(address)

    if (window.computableMember) {
      let firstName, lastName, title, foo
      // our sol just has full name coming back in an array
      [firstName, lastName] = window.computableMember.getFullName()
      document.getElementById('firstName').innerText = firstName
      document.getElementById('lastName').innerText = lastName
      document.getElementById('title').value= window.computableMember.getTitle()
      document.getElementById('foo').value = window.computableMember.getFoo()
    }
  }
})

document.getElementById('submit').addEventListener('click', e => {
  if (!window.computableMember) return;

  const title = document.getElementById('title').value,
    foo = document.getElementById('foo').value

  title && window.computableMember.setTitle(title) 
  foo && window.computableMember.setFoo(foo)
})


