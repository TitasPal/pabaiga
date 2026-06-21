import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreatePost from './pages/CreatePost.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import EditPage from './pages/EditPage.jsx'



function App() {

  const [query, setQuery] = useState("")
  return (
    <BrowserRouter>
      <Navbar query={query} setQuery={setQuery} />
      <div>
        <Routes>
          <Route index element={<HomePage query={query} classname="bg-white" />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
