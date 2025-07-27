import React from 'react';
import LogoSection from './components/LogoSection';
import SocialLoginButton from './components/SocialLoginButton';
import './mobile.css'; // 스타일 import

export default function MobileLogin() {
  return (
    <div className="mobile-login">
      <LogoSection />

      <div className="mobile-login-buttons">
        <SocialLoginButton type="naver" />
        <SocialLoginButton type="kakao" />
        <SocialLoginButton type="facebook" />
        <SocialLoginButton type="google" />
      </div>

      <footer className="mobile-login-footer">
        <p>
          회원가입 및 로그인 시<br />
          서비스 및 개인정보 처리방침 동의로 간주합니다.
        </p>
      </footer>
    </div>
  );
}
