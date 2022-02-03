import ContactItem from "components/ContactList/ContactItem";
import AppContext from "context/AppContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const { smartContractInstance } = useContext(AppContext)

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
      if (!name && !phone) {
        continue
      }
      // add recently fetched contact to state variable.
      totalContacts.push(
        { id, name, phone }
      )
    }

    setContacts(totalContacts);
  }

  // This will send a transaction for creating contact

  return (
    <>
      <h1 className="header">Contacts</h1>

      <ul className="contact-list">
        {
          Object.keys(contacts).map((contact, index) => (
            <ContactItem key={contacts[index]?.id} contact={contacts[index]} />
          ))
        }

        <Link to="/newContact">Add New Contact</Link>
      </ul>

    </>
  )

};

export default ContactList;
