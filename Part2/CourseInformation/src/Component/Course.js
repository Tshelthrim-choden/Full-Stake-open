import React from 'react';

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
        <div key={part.id}>
          <p>{part.name}  {part.exercises} </p>
        </div>
      ))}
      <b>total of {totalExercises} exercises</b>
    </div>
  );
};

export default Course;
