import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../styles/auth.css";

export default function Authentication() {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (mode === "signup" && name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }

    if (!username.trim()) {
      return "Username is required";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const payload =
      mode === "signup"
        ? { name, username, password }
        : { username, password };

    // simulate API call
    setTimeout(() => {
      console.log("AUTH PAYLOAD:", payload);
      setLoading(false);
    }, 1500);
  }

  function handleGuestJoin() {
    console.log("Joining as guest...");
  }

  return (
    <div className="authContainer">
      <div className="authCard">
        {/* Branding */}
        <h2 className="appTitle">EchoWave</h2>
        <p className="appTagline">
          {mode === "signin"
            ? "Join meetings instantly. No friction."
            : "Create your account and start meetings in seconds."}
        </p>

        {/* Mode Toggle */}
        <div className="authToggle">
          <button
            type="button"
            className={mode === "signin" ? "active" : ""}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && <p className="errorText">{error}</p>}

        {/* Form */}
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
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        {/* <div className="divider">OR</div> */}

        {/* Guest Join */}
        {/* <Button
          variant="text"
          onClick={handleGuestJoin}
          className="guestBtn"
        >
          Join as Guest
        </Button> */}

        {/* Privacy hint */}
        <p className="privacyHint">
          🔒 Camera & microphone access is only requested during meetings.
        </p>
      </div>
    </div>
  );
}
