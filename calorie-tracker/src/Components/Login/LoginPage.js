import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../SignUp/Auth.css";


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("⚠️ Please fill in all fields!");
      return;
    }
    try {
      const response = await axios.post("https://calorie-tracker-backend-latest.onrender.com/auth/login", { email, password });
      localStorage.setItem("jwtToken", response.data.token);
      navigate("/tracker");
    } catch (error) {
      setError("❌ Login failed. Check your credentials.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="auth-container fade-in">
      <h1 className="auth-title bounce">🔐 Welcome Back!</h1>
      {error && <p className="error-message shake">{error}</p>}
      <div className="auth-box slide-in">
        <div className="input-group">
          <label>📧 Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>🔑 Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="login-button glow">🚀 Login</button>
          <button onClick={() => navigate("/signup")} className="signup-button pulse">🆕 Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


