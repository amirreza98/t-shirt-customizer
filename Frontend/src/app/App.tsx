import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "../features/auth/NotFound.jsx";
import Customizer from "../pages/Customizer.jsx";
import Home from "../pages/Home.jsx";
import Canvas from "../features/design/index.jsx";
import { useAuth } from "../features/auth/hooks/use-auth";
import { ProtectedRoute } from "../features/auth/ui/protected-route";
import Navbar from "../shared/components/Navbar.jsx";

function App() {
  const { user, isLoading, fetchUser, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Main home page with 3D Canvas */}
        <Route
          path="/"
          element={
            <main className="app transition-all ease-in">
              <Home />
              <Canvas />
            </main>
          }
        />

        {/* Protected customizer page */}
        <Route
          path="/customizer"
          element={
            <ProtectedRoute>
              <main className="transition-all ease-in h-screen">
                <Home />
                <Canvas />
                <Customizer />
              </main>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;