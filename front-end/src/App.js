import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPages/IndexPage";
import AboutPage from "./pages/IndexPages/AboutPage";
import SignInPage from "./pages/IndexPages/SignInPage";
import SignUpPage from "./pages/IndexPages/SignUpPage";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePages/HomePage";
import ProfilePage from "./pages/HomePages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<IndexPage />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>

      <Route path="/home" element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
