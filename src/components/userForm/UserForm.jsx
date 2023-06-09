import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './UserForm.styled';
import { useState } from 'react';
import { nanoid } from 'nanoid';

const UserForm = ({ onSubmitForm, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (value, name) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (
      contacts.find(el => {
        return el.name === name;
      })
    ) {
      alert('Its allready in case');
      reset();
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onSubmitForm(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For examples Adrian,Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={({ target }) => {
              handleChange(target.value, target.name);
            }}
            value={name}
          />
        </Label>

        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={({ target }) => {
              handleChange(target.value, target.name);
            }}
            value={number}
          />
        </Label>
        <Button type="submit">Add contacts</Button>
      </Form>
    </>
  );
};

export default UserForm;

UserForm.propTypes = {
  onSubmit: PropTypes.func,
};
