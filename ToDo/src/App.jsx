import'./App.css';
import { Container } from 'react-bootstrap';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (text) => {
    const todo = { id: Date.now(), text: text, complete: false };
    setTodos([...todos, todo]);
  };

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <Container className="App">
      <h1>ToDo App</h1>
      <ToDoForm onAddTodo={addTodo} />
      <ToDoList todos={todos} onDeleteTodo={deleteTodo} />
    </Container>
  );
}

export default App;