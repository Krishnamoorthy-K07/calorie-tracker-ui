import './App.css';
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import LoginPage from './Components/Login/LoginPage';
import SignUpPage from './Components/SignUp/SignUp';
import TrackerPage from './Components/Login/Tracker/Tracker';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("jwtToken");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tracker" element={<PrivateRoute><TrackerPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
