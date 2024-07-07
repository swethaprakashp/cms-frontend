import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from './pages/home'
import Dashboard from './pages/dashboard';
const App = () => {
  return (
    <BrowserRouter basename="/cms-frontend"> 
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

