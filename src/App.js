import React from 'react'
import './styles/App.css';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <main>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
        </BrowserRouter>
    </main>
  );
}

export default App;
