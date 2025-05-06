import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const createTask = () => {
    if (!task.trim() || !date) return;
    axios
      .post('http://localhost:5000/add', { task: task.trim(), date })
      .then((result) => {
        window.location.reload();
        setTask('');
        setDate('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className='create-form'>
        <input
          type='text'
          placeholder='Enter a task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button onClick={createTask}>ADD</button>
      </div>
    </main>
  );
};

export default Create;
