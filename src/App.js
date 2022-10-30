import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext';
import { useEffect } from 'react';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import './App.scss';

function App() {
  const { user } = useUserContext();
  useEffect(() => {
    document.body.setAttribute('data-theme', `${user?.theme}`);
  }, [user?.theme]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user?.token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user?.token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user?.token ? <SignUp /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
