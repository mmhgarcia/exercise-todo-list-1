import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CountTodos( { todos } ) {
    return (
        <div>
            <span style={{ fontWeight: 'bold' , color: 'gray'}}>{todos.length} items left.</span>
        </div>
    );
}

function Todo({ todo, index, removeTodo }) {
    return (
        <div  className="todo">
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
            <div>             
                <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
            </div>
        </div>
    );
}

function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
        
            <Form.Group>                
                <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
            </Form.Group>            
        
        </Form>
    );
}

function App() {
    const [todos, setTodos] = React.useState([
        {
            text: "This is a sampe todo",
            isDone: false
        }
    ]);

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const markTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isDone = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
    
        <div className="app" style={{ paddingTop: "40px" }}>
            
            <div className="container" class="bg-light" style={{ paddingTop: "40px", paddingBottom: "40px", height: "95%" , overflow: "scroll" }}>
                
                <div style={{ backgroundColor: "white", marginLeft: "5%", marginRight: "5%" } }>
                
                    <h1 id="titulo" class="display-1 text-center">todos</h1>
                
                    <FormTodo addTodo={addTodo} />
                    
                    <div>
                
                        {todos.map((todo, index) => (
                            <Card>
                                <Card.Body>
                                    <Todo
                                        key={index}
                                        index={index}
                                        todo={todo}                                   
                                        removeTodo={removeTodo}
                                    />
                                </Card.Body>
                            </Card>
                        ))}
                        
                        <br />
                        <CountTodos todos={todos} />
                
                    </div>
                
                </div>
        
            </div>

        </div>
    
    );
}

export default App;