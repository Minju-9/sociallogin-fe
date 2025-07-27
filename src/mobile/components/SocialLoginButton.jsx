import React from 'react';

const buttonStyleMap = {
  naver: { bg: '#1EC800', text: '네이버 계정으로 로그인' },
  kakao: { bg: '#FEE500', text: '카카오 계정으로 로그인', color: '#3C1E1E' },
  facebook: { bg: '#1877F2', text: '페이스북 계정으로 로그인' },
  google: { bg: '#FFFFFF', text: '구글 계정으로 로그인', color: '#000000', border: '1px solid #ccc' },
};

export default function SocialLoginButton({ type }) {
  const style = buttonStyleMap[type];

  const handleLogin = () => {
    const baseUrl = "http://localhost:8083/oauth2/authorization"; // ✅ 배포 URL로 수정
    if (type === "facebook") {
      alert("현재 페이스북 로그인은 지원되지 않습니다.");
      return;
    }
    window.location.href = `${baseUrl}/${type}`;
  };

  return (
    <button
      className="mobile-social-login-button"
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
