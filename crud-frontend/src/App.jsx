import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import UserList from './components/UserList'
import UserAdd from './components/UserAdd'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <BrowserRouter>
        <Header/>
        <Routes>
          {
            /* // http://localhost:3000/ */}
            <Route index element={<UserList />} />
            {/* // http://localhost:3000/add-user */}
            <Route path='/create-user' element = {<UserAdd/>}/>
            {/* // http://localhost:3000/edit-user/id */}
            <Route path='/edit-user/:id' element = {<UserAdd/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
