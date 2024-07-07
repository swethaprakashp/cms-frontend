import React, { useEffect } from 'react'
import { BrowserRouter , Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home'
import Dashboard from './pages/dashboard';
const App = () => {
  function RedirectHandler() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const redirectPath = sessionStorage.getItem('redirect');
      sessionStorage.removeItem('redirect');
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      }
    }, [navigate]);
  
    return null;
  }
  
  return (
    <BrowserRouter basename="/cms-frontend"> 
    <RedirectHandler />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

