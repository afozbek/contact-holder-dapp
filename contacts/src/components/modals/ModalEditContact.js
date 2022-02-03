import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";

const customStyles = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
};

const ModalEditContact = ({ contact, modalIsOpen, closeModal, handleEditContact }) => {
  const [formState, setFormState] = useState({
    name: "",
    phone: ""
  })

  useEffect(() => {
    setFormState({ ...formState, name: contact.name, phone: contact.phone })
  }, [])


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log({ formState })
    await handleEditContact(formState);
    closeModal();
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Contact"
    >
      <button className="close-btn" onClick={closeModal}>X</button>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formState.name} onChange={(e) => { setFormState({ ...formState, name: e.target.value }) }} />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input type="text" name="phone" value={formState.phone} onChange={(e) => { setFormState({ ...formState, phone: e.target.value }) }} />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </Modal>
  );
};

export default ModalEditContact;
