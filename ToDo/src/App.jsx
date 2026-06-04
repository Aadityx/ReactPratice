import'./App.css';
import { Button, Container } from 'react-bootstrap';
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
  
  function markComplete(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    }));
  };

  function deleteCompleted() {
    setTodos(todos.filter(todo => !todo.complete));
  };
  return (
    <Container className="App">
      <h1>ToDo App</h1>
      <ToDoForm onAddTodo={addTodo} />
      <ToDoList todos={todos} onDeleteTodo={deleteTodo} markComplete={markComplete} />
      <Button variant="secondary" onClick={() => deleteCompleted()}>
        Clear completed tasks
      </Button>
    </Container>
  );
}

export default App;