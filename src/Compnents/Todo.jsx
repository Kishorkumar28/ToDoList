import React, { useState } from 'react';

export default function Todoapp() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track the index of the todo being edited
  const [filterStatus, setFilterStatus] = useState('All'); // Filter status: All, Completed, Not Completed

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'todoName') {
      setTodoName(value);
    } else if (name === 'todoDescription') {
      setTodoDescription(value);
    }
  };

  const handleAddTodo = () => {
    if (todoName.trim() === '' || todoDescription.trim() === '') {
      alert('Please enter both TodoName and TodoDescription.');
      return;
    }
    const newTodo = { name: todoName, description: todoDescription, status: 'Not Started' };
    setTodos([...todos, newTodo]);
    setTodoName('');
    setTodoDescription('');
  };

  const handleEditTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
    setEditIndex(null); // Clear edit mode after editing
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditClick = (index) => {
    const todoToEdit = todos[index];
    setTodoName(todoToEdit.name);
    setTodoDescription(todoToEdit.description);
    setEditIndex(index);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (todoName.trim() === '' || todoDescription.trim() === '') {
      alert('Please enter both TodoName and TodoDescription.');
      return;
    }
    const updatedTodo = { name: todoName, description: todoDescription, status: 'Not Started' };
    handleEditTodo(editIndex, updatedTodo);
    setTodoName('');
    setTodoDescription('');
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status = newStatus;
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === 'All') {
      return true; // Show all todos
    } else if (filterStatus === 'Not Completed') {
      return todo.status !== 'Completed'; // Show todos that are not completed
    } else {
      return todo.status === filterStatus; // Show todos based on filterStatus
    }
  });

  return (
    <div className="container" >
      <h1 className="header">To Do App</h1>
      <div className="input">
        <input
          className="inputs"
          type="text"
          name="todoName"
          placeholder="TodoName"
          value={todoName}
          onChange={handleInputChange}
        />
        <input
          className="inputs"
          type="text"
          name="todoDescription"
          placeholder="TodoDescription"
          value={todoDescription}
          onChange={handleInputChange}
        />
        {editIndex !== null ? (
          <input className="inputs" id="editbutton" type="submit" value="Edit Todo" onClick={handleEditSubmit} />
        ) : (
          <input className="inputs" id="addbutton" type="button" value="Add Todo" onClick={handleAddTodo} />
        )}
        
      </div>
      <div className='Mytodos'>
        <h1 className="header">My Todos</h1>
        <select id="filter" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
        <div className="todos">
          {filteredTodos.map((todo, index) => (
            <div className="todo" key={index}>
              <h3>Name: {todo.name}</h3>
              <div className="description">{todo.description}</div>
              <select id="status" value={todo.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                <option value="Not Started">Not Started</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="todo-actions">
                <input className="modify" type="button" value="Edit" onClick={() => handleEditClick(index)} />
                <input className="modify" type="button" value="Delete" onClick={() => handleDeleteTodo(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

