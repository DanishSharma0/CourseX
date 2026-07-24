import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home/Home';
import CourseCatalog from './pages/courses/CourseCatalog';
import CourseDetail from './pages/courseDetail/CourseDetail';
import Dashboard from './pages/dashboard/Dashboard';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<CourseCatalog />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route 
            path='/dashboard' 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
