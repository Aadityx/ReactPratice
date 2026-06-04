import { Card } from "react-bootstrap";

function ToDoList({ todos, onDeleteTodo, markComplete }) {
    return (
        <div>
            <h2>ToDo List</h2>
            <ul>
                {todos.map((todo) => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <button variant="primary" onClick={() => markComplete(todo.id)}>
                                Change Status
                            </button>
                            Completed {todo.complete ? 'Yes' : 'No'}
                            <Card.Title>{todo.text}</Card.Title>
                            <button variant="danger" onClick={() => onDeleteTodo(todo.id)}>
                                Delete
                            </button>
                        </Card.Body>
                    </Card>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList;