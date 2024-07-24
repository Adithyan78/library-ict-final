import React from 'react';
import { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Intro from './components/Intro';
import Signup from './components/Signup';
import Home from './components/Home';
import Signup2 from './components/Signup2';
import './App.css';



import Admin from './components/Admin';
import Viewuser from './components/Viewuser';
import Profile from './components/Profile';
import Viewbooks from './components/Viewbooks';
import Addbook from './components/Addbook';
import Books from './components/Books';
import Pay from './components/Pay';


function App() {
  const location = useLocation();
  const [count, setCount] = useState(0);

  // Conditionally render Intro component based on current route
  const renderIntro = !location.pathname.startsWith('/Books');

  return (
    <>
      {renderIntro && <Intro />}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/s' element={<Signup />} />
        <Route path='/Signup2' element={<Signup2 />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Viewuser' element={<Viewuser />} />
        <Route path='/Viewbooks' element={<Viewbooks />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Addbook' element={<Addbook />} />
        
       
        <Route path='/Books' element={<Books />} />
        <Route path="/Pay" element={<Pay />} />
        <Route path="/Pay/:bookId" element={<Pay />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
