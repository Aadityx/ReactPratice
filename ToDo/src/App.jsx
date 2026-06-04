import './App.css';
import { Container, Form, AddButton } from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
      <h1>ToDo App</h1>
      <ToDoForm />
    </Container>
  );
}

export default App;