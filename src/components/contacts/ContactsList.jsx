import PropTypes from 'prop-types';
import { List, Item, ContactsBtn } from './ContactsList.styled';

const Contacts = ({ filterContacts, deleteContact }) => {
  return filterContacts.map(contact => (
    <List key={contact.id}>
      <Item>
        <p>
          {contact.name}: {contact.number}
        </p>
        <ContactsBtn
          type="button"
          onClick={() => deleteContact(contact.id)}
          id={contact.id}
        >
          Delete
        </ContactsBtn>
      </Item>
    </List>
  ));
};

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
