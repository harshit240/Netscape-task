import './App.css';
import Login from './login/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './register/register';
import Home from './home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
