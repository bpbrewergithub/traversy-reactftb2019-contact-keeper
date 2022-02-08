import React, { useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if(contacts.length === 0) {
    return <h4>Please add a contact...</h4>
  }

  if(filtered.length === 0) {
    return <h4>No contacts to display</h4>
  }

  return (
    <>
      {filtered !== null ? filtered.map(contact => (<ContactItem key={contact.id} contact={contact} />)) : contacts.map(contact => <ContactItem key={contact.id} contact={contact}/>)}
    </>
  );
};

export default Contacts;