import React from 'react';
import '../mobile.css';

export default function LogoSection() {
  return (
    <div className="mobile-logo-section">
      <img
        src="/sejong_logo.png"        // ✅ public 폴더 기준
        alt="Sejong Logo"
        className="mobile-logo-image-sejong"
      />
      <img
        src="/maintext_logo.png"      // ✅ public 폴더 기준
        alt="Main Text"
        className="mobile-logo-image-maintext"
      />
      <img
        src="/subtext_logo.png"       // ✅ public 폴더 기준
        alt="Sub Text"
        className="mobile-logo-image-subtext"
      />
      <p className="mobile-logo-text">
      </p>
    </div>
  );
}
