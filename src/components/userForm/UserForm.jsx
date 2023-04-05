import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './UserForm.styled';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
const UserForm = ({ onSubmitform, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (name, value) => {
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

    if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
      return toast.info(`${name} is already in contacts.`);
    } else if (
      contacts.find(el => el.number.toLowerCase() === number.toLowerCase())
    ) {
      return toast.info(`${number} is already in contacts.`);
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    onSubmitform(newContact);
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

// class UserForm extends Component {
//   render() {
//     return (
//       <>
//         <Form onSubmit={this.props.onSubmit}>
//           <Label htmlFor="">
//             Name
//             <Input
//               type="text"
//               name="name"
//               pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For examples Adrian,Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               onChange={this.props.onChange}
//               value={this.props.nameValue}
//             />
//           </Label>

//           <Label>
//             Number
//             <Input
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//               onChange={this.props.onChange}
//               value={this.props.numberValue}
//             />
//           </Label>
//           <Button type="submit">Add contacts</Button>
//         </Form>
//       </>
//     );
//   }
// }

// export default UserForm;

UserForm.propTypes = {
  onSubmit: PropTypes.func,
};
