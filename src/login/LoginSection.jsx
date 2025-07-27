// src/login/LoginSection.jsx
import React from 'react';

function LoginButton({ className, text, onClick }) {
return (
<button className={`login-button ${className}`} onClick={onClick}>
<div className="icon-box" />
<span>{text}</span>
</button>
);
}

export default function LoginSection() {
// ✅ 백엔드 OAuth2 URL로 바로 이동
const handleLogin = (provider) => {
if (provider === "naver") {
window.location.href = "http://localhost:8083/oauth2/authorization/naver";
} else if (provider === "kakao") {
window.location.href = "http://localhost:8083/oauth2/authorization/kakao";
} else if (provider === "google") {
window.location.href = "http://localhost:8083/oauth2/authorization/google";
}else if (provider =="facebook"){
  window.location.href = "http://localhost:8083/oauth2/authorization/facebook";
}
};

return (
<div className="login-section">
<h2>Login</h2>
<LoginButton
    className="btn-naver"
    text="네이버 계정으로 로그인"
    onClick={() => handleLogin("naver")}
  />
  <LoginButton
    className="btn-kakao"
    text="카카오 계정으로 로그인"
    onClick={() => handleLogin("kakao")}
  />
  <LoginButton
    className="btn-facebook"
    text="페이스북 계정으로 로그인"
    onClick={() => alert("페이스북 로그인은 준비 중입니다.")}
  />
  <LoginButton
    className="btn-google"
    text="구글 계정으로 로그인"
    onClick={() => handleLogin("google")}
  />

  <p className="login-notice">
    회원가입 및 로그인은 플랫폼의<br />
    로그인 시 <u>이용약관</u> 및 <u>개인정보 처리방침</u> 동의로 간주합니다.
  </p>
</div>
);
}