function ToDoForm() {
    return (
        <Container >
            <Form>
                <FormGroup className="form">
                    <Label for="task">Task</Label>
                    <Input type="text" name="task" id="task" placeholder="Enter a task" />
                </FormGroup>
                <FormGroup className="AddButton">
                    <Button color="primary">Add Task</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default ToDoForm