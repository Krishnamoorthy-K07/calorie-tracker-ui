import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";



function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("⚠️ Please fill in all fields!");
      return;
    }
    try {
      const response = await axios.post("https://calorie-tracker-backend-latest.onrender.com/auth/register", { name, email, password });
      if (response.status === 200) {
        navigate("/");
      } else {
        setError("❌ Sign-up failed. Try again.");
      }
    } catch (error) {
      setError("❌ Sign-up failed. Try again.");
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div className="auth-container fade-in">
      <h1 className="auth-title bounce">🆕 Create an Account</h1>
      {error && <p className="error-message shake">{error}</p>}
      <div className="auth-box slide-in">
        <div className="input-group">
          <label>👤 Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>📧 Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>🔑 Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleSignUp} className="signup-button glow">✅ Register</button>
          <button onClick={() => navigate("/")} className="login-button pulse">🔙 Back to Login</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

