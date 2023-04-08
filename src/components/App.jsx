import Contacts from '../components/contacts/ContactsList';
import { useEffect, useState } from 'react';
import UserForm from '../components/userForm/UserForm';
import { Filter } from '../components/filter/Filter';
import { Section } from './section/Section';
import { nanoid } from 'nanoid';

const defultContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

const STORAGE_KEY = 'contacts';
const getContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));

const App = () => {
  const [contacts, setContacts] = useState(getContacts || defultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = newContact => {
    setContacts([...contacts, ...[newContact]]);
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <Section>
        <h1>Phonebook</h1>
        <UserForm onSubmitForm={onSubmitForm} contacts={contacts} />
        {contacts.length > 0 && (
          <>
            <h2>Contacts</h2>
            <Filter onFilter={onFilter} filter={filter} />

            <Contacts
              deleteContact={deleteContact}
              filterContacts={filterContacts()}
            />
          </>
        )}
      </Section>
    </>
  );
};

export default App;
