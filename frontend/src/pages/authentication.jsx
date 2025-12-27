import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import "../styles/auth.css";
import { AuthContext } from "../contexts/AuthContext";

export default function Authentication() {
  const [mode, setMode] = useState("signup"); // signin | signup
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { handleRegister, handleLogin } = useContext(AuthContext);

  function validate() {
    if (mode === "signup" && name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }

    if (!username.trim()) {
      return "Username is required";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await handleRegister(name, username, password);
        setMessage(res?.message || "Registration successful");
        setName("");
        setUsername("");
        setPassword("");
      } else {
        const res = await handleLogin(username, password);
        setUsername("");
        setPassword("");
        setMessage(res?.message || "Login successful");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function switchMode(newMode) {
    setMode(newMode);
    setError("");
    setMessage("");
  }

  return (
    <div className="authContainer">
      <div className="authCard">
        <h2 className="appTitle">EchoWave</h2>

        <p className="appTagline">
          {mode === "signin"
            ? "Join meetings instantly. No friction."
            : "Create your account and start meetings in seconds."}
        </p>

        <div className="authToggle">
          <button
            type="button"
            className={mode === "signin" ? "active" : ""}
            onClick={() => switchMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => switchMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {error && <p className="errorText">{error}</p>}
        {message && <p className="successText">{message}</p>}

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="submitBtn"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Log In"
              : "Register"}
          </Button>
        </form>

        <p className="privacyHint">
          🔒 Camera & microphone access is only requested during meetings.
        </p>
      </div>
    </div>
  );
}
