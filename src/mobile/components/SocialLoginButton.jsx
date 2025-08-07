import React from 'react';
import "../mobile.css";

const buttonStyleMap = {
  naver: { bg: '#5FCC3D', text: '네이버 계정으로 로그인' },
  kakao: { bg: '#EDDC65', text: '카카오 계정으로 로그인', color: '#3C1E1E' },
  facebook: { bg: '#3670DF', text: '페이스북 계정으로 로그인' },
  google: { bg: '#FFFFFF', text: '구글 계정으로 로그인', color: '#000000', border: '1px solid #ccc' },
};

export default function SocialLoginButton({ type }) {
  const style = buttonStyleMap[type];

  const handleLogin = () => {
    const baseUrl = "https://sociallogin-tyc7.onrender.com/oauth2/authorization";
    window.location.href = `${baseUrl}/${type}`;
  };

  return (
    <button
      className={`mobile-social-login-button btn-${type}`}
      style={{
        backgroundColor: style.bg,
        color: style.color || 'white',
        border: style.border || 'none',
        width: '80%',
        height: '48px',
        margin: '8px auto',
        display: 'block',
        borderRadius: '999px',
        fontWeight: 'bold',
      }}
      onClick={handleLogin}
    >
      {style.text}
    </button>
  );
}
