import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg2.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success("Welcome back 💙");
      navigate("/");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-bg" 
        style={{
          backgroundImage: `url(${bg})`,
        }}>
      <div className="glass-login">
        <h2 className="romantic-text">Welcome Back 🤍</h2>

        <div className="input-group-glass">
          <input
            className="glass-input"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group-glass">
          <input
            type="password"
            className="glass-input"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="glass-btn primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
