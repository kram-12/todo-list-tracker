import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsPencil,
} from 'react-icons/bs';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [updatetask, setUpdatetask] = useState('');
  const [updatedate, setUpdatedate] = useState('');
  const [taskid, setTaskid] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const edit = (id) => {
    axios
      .put(`http://localhost:5000/edit/${id}`)
      .then((result) => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const Update = (id, updatedTask, updatedDate) => {
    axios
      .put(`http://localhost:5000/update/${id}`, {
        task: updatedTask,
        date: updatedDate,
      })
      .then((result) => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, task: updatedTask, date: updatedDate };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setTaskid('');
        setUpdatetask('');
        setUpdatedate('');
      })
      .catch((err) => console.log(err));
  };

  const Hdelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((result) => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <h1>📝 TODO List Tracker</h1>
      <Create />
      {todos.length === 0 ? (
        <div className='task'>No tasks found</div>
        ) : (
        todos.map((todo) => (
            <div className='task' key={todo._id}>
            <div className='checkbox'>
                {todo.done ? (
                <BsFillCheckCircleFill className='icon' onClick={() => edit(todo._id)} />
                ) : (
                <BsCircleFill className='icon' onClick={() => edit(todo._id)} />
                )}
            </div>
            <div>
                {taskid === todo._id ? (
                    <>
                    <input
                        type='text'
                        value={updatetask}
                        onChange={(e) => setUpdatetask(e.target.value)}
                    />
                    <br></br>
                    <input
                        type='date'
                        value={updatedate}
                        onChange={(e) => setUpdatedate(e.target.value)}
                    />
                    </>
                ) : (
                    <>
                    <p className={todo.done ? 'through' : 'normal'}>🎯 {todo.task}</p>
                    <small className={todo.done ? 'through' : 'normal'}>📅 {todo.date}</small>
                    </>
                )}
            </div>
    
            <div>
                <span>
                <BsPencil
                    className='icon'
                    onClick={() => {
                    if (taskid === todo._id) {
                        Update(todo._id, updatetask, updatedate);
                    } else {
                        setTaskid(todo._id);
                        setUpdatetask(todo.task);
                        setUpdatedate(todo.date);
                    }
                    }}
                />
                <BsFillTrashFill
                    className='icon'
                    onClick={() => Hdelete(todo._id)}
                />
                </span>
            </div>
            </div>
        ))
      )}

    </main>
  );
};

export default Home;
