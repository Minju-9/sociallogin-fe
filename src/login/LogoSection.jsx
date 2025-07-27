import React from 'react';

export default function LogoSection() {
  return (
    <div className="logo-section">
      <div className="logo-box">
        <img
          src="/sejong_logo.png"
          alt="세종시 로고"
          className="mobile-logo-image-sejong"
        />

        <img
          src="/logo_all.png"
          alt="로고타이틀"
          className="mobile-logo-title"
        />
      </div>
    </div>
  );
}
