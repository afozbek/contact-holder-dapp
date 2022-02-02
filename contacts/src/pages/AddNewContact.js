import AppContext from "context/AppContext";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom"

const AddNewContact = () => {
  const { account, smartContractInstance } = useContext(AppContext)
  let navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    phone: ""
  })

  const handleAddNewContact = async (e) => {
    e.preventDefault();

    const { name, phone } = formState
    if (!name || !phone) {
      throw new Error("Validation error")
    }

    if (!smartContractInstance || !account) {
      throw new Error("Smart Contract Validation Error")
    }

    try {
      const hash = await createContactTx(name, phone)

      console.log({ hash })
      toast.success(hash)
      e.target.reset();
      navigate("/contacts")
    }
    catch (err) {
      toast.error(err.message)
    }

  }

  const createContactTx = async (name, phone) => {
    // const contactList = await getContractInstance();

    return new Promise((resolve, reject) => {
      const tx = smartContractInstance.methods.createContact(name, phone).send({ from: account });
      tx
        .on("transactionHash", (hash) => resolve(hash))
        .on("error", (error) => reject(error))
    })
  }

  return <form onSubmit={handleAddNewContact}>
    <div>
      <label>
        Name:
        <input type="text" name="name" onChange={(e) => { setFormState({ ...formState, name: e.target.value }) }} />
      </label>
    </div>
    <div>
      <label>
        Number:
        <input type="text" name="phone" onChange={(e) => { setFormState({ ...formState, phone: e.target.value }) }} />
      </label>
    </div>


    <input type="submit" value="Submit" />
  </form>
};

export default AddNewContact;
