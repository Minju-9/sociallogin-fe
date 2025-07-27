import React from 'react';

export default function LogoSection_Dash() {
  return (
    <div className="mobile-mini-header">
      <img
        src="/sejong_logo.png"    // ✅ public 폴더 기준 절대 경로
        alt="로고"
        className="mobile-mini-logo"
      />

      <img
        src="/maintext_logo.png"  // ✅ public 폴더 기준 절대 경로
        alt="로고텍스트"
        className="mobile-mini-logotext"
      />
    </div>
  );
}
