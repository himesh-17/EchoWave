import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import LandingPage from "./pages/landing.jsx";
import Authentication from './pages/authentication'
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeet from './pages/videoMeet.jsx';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/video' element={<VideoMeet/>}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
