import { Container, Form, Button } from 'react-bootstrap';

function ToDoForm({ onAddTodo }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.elements[0];
        const text = input.value.trim();
        if (text) {
            onAddTodo(text);
            input.value = '';
        }
    };
      return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter task" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );

}

export default ToDoForm