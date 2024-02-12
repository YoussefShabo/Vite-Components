import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home"
import Login from './components/pages/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import SignUp from './components/Auth/Signup';
import Settings from './components/Auth/Settings';
import ErrorPage from './components/pages/ErrorPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
