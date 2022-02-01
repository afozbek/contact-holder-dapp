import React from "react";

const ContactItem = ({ contact }) => {
  return (
    <li className="contact-item">
      <h5 className="name">{contact.name}</h5>
      <p className="phone">{contact.phone}</p>

    </li>
  )
};

export default ContactItem;
