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
  const BASE_URL = "https://sociallogin-tyc7.onrender.com"; // ✅ 배포 백엔드 URL

  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isInAppWebView = () => /(KAKAOTALK|NAVER|FBAN|FBAV|Instagram)/i.test(navigator.userAgent);

  const handleLogin = (provider) => {
    const url = `${BASE_URL}/oauth2/authorization/${provider}`;

    // 구글 인앱웹뷰 경고
    if (provider === "google" && isMobile() && isInAppWebView()) {
      alert("구글 로그인이 앱 내 브라우저에서 제한될 수 있어요.\n기본 브라우저로 열어서 시도해주세요.");
    }

    if (isMobile()) {
      // ✅ 모바일: 현재 탭 이동
      window.location.href = url;
    } else {
      // ✅ 데스크톱: 팝업(차단되면 현재 탭)
      const w = window.open(url, "_blank", "noopener");
      if (!w) window.location.href = url;
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
        onClick={() => handleLogin("facebook")}
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
