import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={
            isLoggedIn
              ? <Navigate to="/home" replace />
              : <Login />
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={isLoggedIn ? "/home" : "/login"}
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;