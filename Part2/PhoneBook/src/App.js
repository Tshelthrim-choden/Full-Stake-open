import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Component/Filter';
import PersonForm from './Component/PersonForm';
import Persons from './Component/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sameName = persons.some(person => person.name === newName);
    const sameNumber = persons.some(person => person.number === newNumber);

    if (sameName) {
      alert(`${newName} is already added to phonebook`);
    } else if (sameNumber) {
      alert(`Number ${newNumber} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }));
    }

    setNewName('');
    setNewNumber('');
  };

  const filteredPersons =persons.filter(person =>
        person.name.toLowerCase().startsWith(searchName.toLowerCase())
      );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName}/>
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber} 
        handleSubmit={handleSubmit} 
      />
      <h2>Numbers</h2>
     <Persons filteredPersons={filteredPersons}/>
    </div>
  );
};

export default App;