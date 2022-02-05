import ContactItem from "components/ContactList/ContactItem";
import AppContext from "context/AppContext";
import { TransactionContext } from "context/TransactionContext";
import useTransactionListener from "hooks/useTransactionListener";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState({
    isContactListLoading: false
  })

  const { smartContractInstance } = useContext(AppContext)
  const { transactionList } = useContext(TransactionContext)
  const { lastFinishedTransaction } = useTransactionListener()

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

    setLoading({ isContactListLoading: true })
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
    setLoading({ isContactListLoading: false })
  }

  // This will send a transaction for creating contact

  useEffect(() => {
    const fetchNewList = async () => {
      await getContactList()
    }

    if (lastFinishedTransaction) {
      console.log({ lastFinishedTransaction })
      fetchNewList();
    }
  }, [lastFinishedTransaction])

  console.log({ transactionList })

  return (
    <>
      <h1 className="header">Contacts</h1>

      {
        !loading.isContactListLoading
          ?
          <ul className="contact-list">
            {
              Object.keys(contacts).map((contact, index) => (
                <ContactItem key={contacts[index]?.id} contact={contacts[index]} />
              ))
            }

            <Link to="/newContact">Add New Contact</Link>
          </ul>
          :
          "Loading.."
      }

    </>
  )

};

export default ContactList;
