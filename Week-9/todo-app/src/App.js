import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './components/core/home';
function App() {
  return (
    <div className='wrapper'>
      {/*<!-- Nav As a heading -->*/}
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">To Do List</span>
        </div>
      </nav>
      <Home />
    </div>
  );
}

export default App;