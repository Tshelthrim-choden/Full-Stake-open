import React from 'react';

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.length > 0 ? (
        filteredPersons.map(person => (
          <div key={person.id}>{person.name} {person.number}</div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default Persons;
