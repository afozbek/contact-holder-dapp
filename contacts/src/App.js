import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';

function App() {
  const [account, setAccount] = useState();

  const [contacts, setContacts] = useState([]);
  const [contactSmartContractInstance, setContactSmartContractInstance] = useState(null);

  useEffect(() => {
    async function load() {

      const contactList = await getContractInstance();

      setContactSmartContractInstance(contactList)
      // set contact list to state variable.

      await getContactList(contactList)
    }

    load();
  }, []);

  const getContactList = async (contactSmartContractInstance) => {
    // Then we get total number of contacts for iteration
    const counter = await contactSmartContractInstance.methods.count().call();
    console.log({ counter })

    let totalContacts = []
    // // iterate through the amount of time of counter
    for (var i = 1; i <= counter; i++) {
      // call the contacts method to get that particular contact from smart contract
      const { id, name, phone } = await contactSmartContractInstance.methods.contactList(i).call();
      // add recently fetched contact to state variable.
      totalContacts.push(
        { id, name, phone }
      )
    }

    debugger
    setContacts(totalContacts);
  }


  // This will send a transaction for creating contact
  const createContact = async (name, phone) => {
    const contactList = await getContractInstance();

    return new Promise(async (resolve, reject) => {
      const tx = await contactList.methods.createContact(name, phone).send({ from: account });
      debugger
      tx
        .on("transactionHash", (hash) => resolve(hash))
        .on("error", (error) => reject(error))
    })
  }

  // Returns contactSmartContractInstance
  const getContractInstance = async () => {
    const localGanacheRPCUrl = "http://localhost:7545"
    const web3 = new Web3(Web3.givenProvider || localGanacheRPCUrl);
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    // Instantiate smart contract using ABI and address.
    return new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }

  return (
    <div>
      Your account is: {account}
      <h1>Contacts</h1>
      <ul>
        {
          Object.keys(contacts).map((contact, index) => (
            <li key={`${contacts[index].name}-${index}`}>
              <h4>{contacts[index].name}</h4>
              <span><b>Phone: </b>{contacts[index].phone}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;