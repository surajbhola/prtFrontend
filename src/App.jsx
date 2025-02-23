import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>

        {user ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        ) : (
          <Route path="/auth" element={<Auth />} />
        )}

        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;
