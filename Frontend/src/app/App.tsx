import Canvas from "../features/design/index.jsx";
import Customizer from "../pages/Customizer.jsx";
import Home from "../pages/Home.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "../shared/components/Navbar.jsx";
import LoginFirst from "../pages/LoginFirst.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import NotFound from "../features/auth/NotFound.jsx";
axios.defaults.withCredentials = true;

function App() {

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/auth/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }



  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LoginFirst user={user} error={error} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

    // <main className="app transition-all ease-in">
    //   <Home />
    //   <Canvas />
    //   <Customizer />
    // </main>