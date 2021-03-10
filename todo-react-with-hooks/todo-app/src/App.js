import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Muestra , al pie de la lista, la cantidad de 'todos' que contiene */
function CountTodos( { todos } ) {
    return (
        <div>
            <span style={{ fontWeight: 'bold', color: 'gray' }}>
                {todos.length} items en lista.
            </span>
        </div>
    );
}

/* 
    Define la presentacion de UN TODO ( texto y el boton de eliminar)
    Recibe 3 parametros: 
        'todo
        indice
        la funcion encargada de eliminar
*/
function Todo({ todo, index, removeTodo }) {
    return (
        <div  class="todo">
            <span  style={{fontSize: "1.2em"}}>{todo.text}</span>
            <div>             
                <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
            </div>
        </div>
    );
}

/*  
    Este es el formulario que presenta el titulo y la caja de texto.
    Solo si se ingresa un valor, este es añadido a la lista.
*/
function FormTodo({ addTodo }) {

    /*Hook para manejar el valor del texto ingresado */
    const [value, setValue] = React.useState("");

    /* Al pulsar enter en la caja de texto se llama a este evento  */
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
        
            {/* Titulo de la UI */}
            <h1 id="titulo" class="display-1 text-center">todos</h1>

            {/* Caja de texto para ingresar el 'todo' */}
            <Form.Group>                
                <Form.Control type="text"
                    className="input"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    style={{ fontSize: "1.4em" }}
                    placeholder="Ingrese nuevo TODO y presione Enter." />
            </Form.Group>            
        
        </Form>
    );
}

function App() {

    /* Hook  para controlar la lista de 'todos' */
    const [todos, setTodos] = React.useState([
        {
            text: "Este es un todo de prueba cargado al iniciar.",
            isDone: false
        },
        {
            text: "Ir al cine.",
            isDone: false
        },
        {
            text: "Ir a la playa.",
            isDone: false
        }
    ]);

    /* Añade un 'todo' a la lista */
    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    /*
        Elimina un 'todo' de la lista 
        recibe como parametro el indice del item a eliminar    
    */
    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
    
        <div className="app" style={{ paddingTop: "40px" }}>
            
            <div class="container bg-light" style={{ paddingTop: "40px", paddingBottom: "40px", height: "95%", overflow: "scroll" }}>
                
                <div style={{ backgroundColor: "white", marginLeft: "5%", marginRight: "5%", paddingLeft: "25px", paddingRight: "25px" } }>

                    { /* Formulario para ingreso de texto */}
                    <FormTodo addTodo={addTodo}  />
                    
                    <div>
                
                        { /* Presenta el contenido del array 'todos' en forma de lista */}
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

                        { /* Presenta al pie de lista el numero de elementos de la lista. */}
                        <CountTodos todos={todos} />
                
                    </div>
                
                </div>
        
            </div>

        </div>
    
    );
}

export default App;