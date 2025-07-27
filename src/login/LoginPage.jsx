// src/login/LoginPage.jsx
import React from "react";
import "./LoginPage.css"; 
import LogoSection from "./LogoSection";
import LoginSection from "./LoginSection";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="logo-section">
        <LogoSection />
      </div>
      <div className="login-section">
        <LoginSection />
      </div>
    </div>
  );
}
