import { Card } from "react-bootstrap";

function ToDoList({ todos }) {
    return (
        <div>
            <h2>ToDo List</h2>
            <ul>
                {todos.map((todo) => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{todo.text}</Card.Title>
                            <button variant="danger">Delete</button>
                        </Card.Body>
                    </Card>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList;