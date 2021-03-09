import React, { useState } from 'react'

//import logo from './logo.svg';

import './App.css';

function App() {

    let classTitulo = 'Titulo';

    const [contador, setContador] = useState(0);
    
    return (
    
        <div className="App">
        
            <header className="App-header">
                        
                <label className="Titulo">todos</label>

                <div>
                    <input placeholder="Enter a value" />
                    <button>Add</button>
                </div>
        
            </header>
        
        </div>
    );
}

export default App;
