import React, { useState } from "react";
import axios from "../axiosSetup";

const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || "";
};

const ResetPassword = () => {
  const token = getQueryParam("token");
  const emailParam = getQueryParam("email");
  const [form, setForm] = useState({
    email: emailParam,
    password: "",
    password_confirmation: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("/reset-password", { ...form, token });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm New Password"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <div style={{color: "green"}}>{message}</div>}
      {error && <div style={{color: "red"}}>{error}</div>}
    </div>
  );
};

export default ResetPassword; 