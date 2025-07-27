import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// temporary redeploy test
// redeploy test
// 웹용 컴포넌트
import './dash/Dash.css';
import LoginPage from './login/LoginPage';
import DashboardPage from './dash/DashboardPage';

// 모바일용 컴포넌트
import './mobile/mobile.css';
import MobileLogin from './mobile/MobileLogin';
import MobileDashboard from './mobile/MobileDashboard';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isMobile ? <MobileLogin /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isMobile ? <MobileDashboard /> : <DashboardPage />}
        />
        {/* ✅ 관리자 페이지 추가 */}
        <Route
          path="/admin"
          element={<DashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
