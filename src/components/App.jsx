import { useState } from 'react';
import { AppWrapper } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('key', []);
  const [filter, setFilter] = useState('');
  const onDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeContactsBySumbit = obj => {
    setContacts(prevState => [obj, ...prevState]);
  };

  const handleFindContacts = evt => {
    setFilter(evt.currentTarget.value);
  };

  return (
    <AppWrapper>
      <h2>Phonebook</h2>
      <ContactForm
        contacts={contacts}
        changeContactsBySumbit={changeContactsBySumbit}
      />
      <h3>Contacts</h3>
      <ContactFilter value={filter} handleFindContacts={handleFindContacts} />

      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={onDeleteContact}
      />
    </AppWrapper>
  );
};
