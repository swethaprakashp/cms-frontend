import React, { useEffect } from 'react'
import { BrowserRouter , Route, Routes, useHistory } from 'react-router-dom';
import Home from './pages/home'
import Dashboard from './pages/dashboard';
const App = () => {
  function RedirectHandler() {
    const history = useHistory();
  
    useEffect(() => {
      const redirectPath = sessionStorage.getItem('redirect');
      sessionStorage.removeItem('redirect');
      if (redirectPath) {
        history.replace(redirectPath);
      }
    }, [history]);
  
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

