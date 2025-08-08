// src/mobile/components/SocialLoginButton.jsx
import React from "react";
import "../../mobile.css";

const API_BASE = import.meta.env?.VITE_API_BASE ?? "https://sociallogin-tyc7.onrender.com";

const buttonStyleMap = {
  naver:    { bg: '#5FCC3D', text: '네이버 계정으로 로그인' },
  kakao:    { bg: '#EDDC65', text: '카카오 계정으로 로그인', color: '#3C1E1E' },
  facebook: { bg: '#3670DF', text: '페이스북 계정으로 로그인' },
  google:   { bg: '#FFFFFF', text: '구글 계정으로 로그인', color: '#000000', border: '1px solid #ccc' },
};

const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isInAppWebView = () => /(KAKAOTALK|NAVER|FBAN|FBAV|Instagram)/i.test(navigator.userAgent);

export default function SocialLoginButton({ type }) {
  const style = buttonStyleMap[type];

  const handleLogin = () => {
    const url = `${API_BASE}/oauth2/authorization/${type}`;

    // 구글은 인앱웹뷰에서 종종 막힘 → 안내
    if (type === "google" && isMobile() && isInAppWebView()) {
      alert("구글 로그인이 앱 내 브라우저에서 제한될 수 있어요. '기본 브라우저로 열기' 후 다시 시도해주세요.");
    }

    // ✅ 모바일: 현재 탭 리다이렉트(팝업 NO)
    // ✅ 데스크톱: 새 탭 시도, 차단되면 현재 탭
    if (isMobile()) {
      window.location.href = url;
    } else {
      const w = window.open(url, "_blank", "noopener");
      if (!w) window.location.href = url;
    }
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
