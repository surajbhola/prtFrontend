import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import styles from "./Auth.module.css";
import { baseUrl } from "../../config/api.config";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? `${baseUrl}/auth/login`
        : `${baseUrl}/auth/register`;

      const { data } = await axios.post(url, { name, email, password });

      if (isLogin) {
        dispatch(loginSuccess(data));
        navigate("/");
      } else {
        alert("Registration successful! Please log in.");
        setIsLogin(true);
        setEmail("");  
        setPassword(""); 
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "New user? Register here"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
