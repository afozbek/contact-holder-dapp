import ModalEditContact from "components/modals/ModalEditContact";
import AppContext from "context/AppContext";
import { TransactionContext } from "context/TransactionContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TRANSACTION_NAMES } from "utils/enums";

const ContactItem = ({ contact }) => {

  const [modals, setModals] = useState({
    ModalEditContact: false
  })
  const { account, smartContractInstance, web3Instance } = useContext(AppContext)
  const { transactionList, setTransactionList } = useContext(TransactionContext)

  const handleEditContact = async (newContact) => {
    if (!contact || !contact.id) {
      throw new Error("Validation Error")
    }

    if (!smartContractInstance || !account) {
      throw new Error("Smart Contract Validation Error")
    }

    try {
      const hash = await editContactTx(contact.id, newContact.name, newContact.phone)
      const tx = await web3Instance.eth.getTransaction(hash);
      console.log({ tx })
      const newTx = {
        ...tx,
        type: TRANSACTION_NAMES.UPDATE_CONTACT
      }

      setTransactionList([...transactionList, newTx])
      console.log({ hash })
      toast.success(hash)
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  const editContactTx = async (contactId, name, phone) => {
    // const contactList = await getContractInstance();

    return new Promise((resolve, reject) => {
      const tx = smartContractInstance.methods.editContact(contactId, name, phone).send({ from: account });
      tx
        .on("transactionHash", (hash) => resolve(hash))
        .on("error", (error) => reject(error))
    })
  }

  const handleDeleteContact = async () => {
    if (!contact || !contact.id) {
      throw new Error("Validation Error")
    }

    if (!smartContractInstance || !account) {
      throw new Error("Smart Contract Validation Error")
    }

    try {
      const hash = await deleteContactTx(contact.id)
      const tx = await web3Instance.eth.getTransaction(hash);
      const newTx = {
        ...tx,
        type: TRANSACTION_NAMES.UPDATE_CONTACT
      }
      setTransactionList([...transactionList, newTx])
      console.log({ hash })
      toast.success(hash)

    }
    catch (err) {
      toast.error(err.message)
    }

  }

  const deleteContactTx = async (contactId) => {
    // const contactList = await getContractInstance();

    return new Promise((resolve, reject) => {
      const tx = smartContractInstance.methods.deleteContact(contactId).send({ from: account });
      tx
        .on("transactionHash", (hash) => resolve(hash))
        .on("error", (error) => reject(error))
    })
  }



  return (
    <>

      <li className="contact-item">
        <h5 className="name">{contact.name}</h5>
        <p className="phone">{contact.phone}</p>

        <button onClick={() => { setModals({ ...modals, ModalEditContact: true }) }}>Edit Contact</button>
        <button onClick={handleDeleteContact}>Delete Contact</button>
      </li>

      <ModalEditContact
        contact={contact}
        modalIsOpen={modals.ModalEditContact}
        closeModal={() => { setModals({ ...modals, ModalEditContact: false }) }}
        handleEditContact={handleEditContact}
      />
    </>
  )
};

export default ContactItem;
