import React from "react";

const ContactItem = ({ contact }) => {
  return (
    <li className="contact-item">
      <h4>{contact.name}</h4>
      <p>{contact.phone}</p>
    </li>
  )
};

export default ContactItem;
