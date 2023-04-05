import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const App = () => {
  const [contacts, setContacts] = useState(
    () => getStorageContacts() || defultContacts
  );
  const [filter, setFilter] = useState('');

  function getStorageContacts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts), [contacts]);
  });

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
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };
  const visibleContacts = filterContacts();
  return (
    <>
      <Section>
        <h1>Phonebook</h1>
        <UserForm onSubmitform={onSubmitForm} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter onFilter={onFilter} filter={filter} />

        <Contacts
          filter={filter}
          deleteContact={deleteContact}
          filterContacts={visibleContacts}
        />
        <ToastContainer />
      </Section>
    </>
  );
};

export default App;
// class App extends Component {
//   state = {
//     contacts: [
//       { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
//       { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
//       { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
//       { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   componentDidMount() {
//     const contactsUser = localStorage.getItem('contacts');
//     const parsedContactsUser = JSON.parse(contactsUser);
//     if (parsedContactsUser) {
//       this.setState({ contacts: parsedContactsUser });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     const { name, number, contacts } = this.state;
//     if (
//       contacts.find(el => {
//         return el.name === name;
//       })
//     ) {
//       alert('Its allready in case');
//       this.reset();
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [
//         { name: name, number: number, id: nanoid() },
//         ...prevState.contacts,
//       ],
//     }));
//     this.reset();
//   };

//   handleChange = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   onFilter = e => {
//     this.setState({
//       filter: e.target.value,
//     });
//   };

//   filterContacts = () => {
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter)
//     );
//   };

//   render() {
//     const visibleContacts = this.filterContacts();
//     return (
//       <>
//         <Section>
//           <h1>Phonebook</h1>
//           <UserForm
//             onSubmit={this.handleSubmit}
//             onChange={this.handleChange}
//             numberValue={this.state.number}
//             nameValue={this.state.name}
//           />

//           <h2>Contacts</h2>
//           <Filter onFilter={this.onFilter} filter={this.state.filter} />

//           <Contacts
//             filter={this.state.filter}
//             deleteContact={this.deleteContact}
//             filterContacts={visibleContacts}
//           />
//         </Section>
//       </>
//     );
//   }
// }

// export default App;
