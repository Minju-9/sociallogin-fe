import React, { useEffect, useState } from 'react';

function Header({ toggleSidebar, toggleUserMenu, userMenuOpen }) {
  const [userName, setUserName] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8083/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ 로그인 사용자 정보:", data);
        const name = data.name || "이름 없음";
        setUserName(`관리자 || ${name}`); // ✅ 앞에 "관리자 ||" 붙이기
      })
      .catch(() => setUserName("오류"));
  }, []);

  return (
    <header>
      <div className="header-left">
        <div className="menu-icon" onClick={toggleSidebar}>&#9776;</div>
        <div className="dash-logo-box">
          <img src="/sejong_logo.png" alt="세종시 로고" className="dash-logo-sejong" />
          <img src="/logo_all.png" alt="세종시 로고" className="dash-logo-title" />
        </div>
        <div className="nav-links">
          <a href="#" style={{ color: 'black', fontWeight: 'semibold' }}>대시보드</a>
          <a href="#">Monitoring</a>
        </div>
      </div>
      <div className={`user-info ${userMenuOpen ? 'active' : ''}`} onClick={toggleUserMenu}>
        {userName} 님
        <div className="logout-menu">로그아웃</div>
      </div>
    </header>
  );
}

export default Header;
