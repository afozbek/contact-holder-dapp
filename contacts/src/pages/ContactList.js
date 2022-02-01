import ContactItem from "components/ContactList/ContactItem";
import AppContext from "context/AppContext";
import React, { useContext, useEffect, useState } from "react";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { account, smartContractInstance } = useContext(AppContext)

  useEffect(() => {
    async function load() {
      await getContactList()
    }

    if (smartContractInstance) {
      load();
    }
  }, [smartContractInstance]);

  const getContactList = async () => {
    if (!smartContractInstance) {
      throw new Error("No instance found")
    }
    // Then we get total number of contacts for iteration
    const counter = await smartContractInstance.methods.count().call();
    console.log({ counter })

    let totalContacts = []
    // // iterate through the amount of time of counter
    for (var i = 1; i <= counter; i++) {
      // call the contacts method to get that particular contact from smart contract
      const { id, name, phone } = await smartContractInstance.methods.contactList(i).call();
      // add recently fetched contact to state variable.
      totalContacts.push(
        { id, name, phone }
      )
    }

    setContacts(totalContacts);
  }

  // This will send a transaction for creating contact
  const createContact = async (name, phone) => {
    // const contactList = await getContractInstance();

    return new Promise(async (resolve, reject) => {
      const tx = await smartContractInstance.methods.createContact(name, phone).send({ from: account });
      tx
        .on("transactionHash", (hash) => resolve(hash))
        .on("error", (error) => reject(error))
    })
  }

  const handleCreateContact = () => {

  }
  return (
    <>
      <h1 className="header">Contacts</h1>

      <ul className="contact-list">
        {
          Object.keys(contacts).map((contact, index) => (
            <ContactItem key={contacts[index]?.id} contact={contacts[index]} />
          ))
        }

        <button onClick={handleCreateContact}>Add new Contact</button>

      </ul>
    </>
  )

};

export default ContactList;
