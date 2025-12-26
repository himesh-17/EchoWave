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

  const { handleRegister, handleLogin } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        let result = await handleRegist(name, username, password);
        console.log(result);
      }
      if (mode === "signin") {
        let result = await handleLogin(username , password);
        console.log(result);
      }

    } catch (error) {
      let message = (error.response.data.message);
      setError(message);
    }
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
                ? "Log In"
                : "Register"}
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
