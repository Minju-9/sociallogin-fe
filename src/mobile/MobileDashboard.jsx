import React, { useEffect, useState } from 'react';
import LogoSection from './components/LogoSection_Dash';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './mobile.css';

export default function MobileDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ 정렬 상태
  const [sortField, setSortField] = useState("createdAt");
  const [direction, setDirection] = useState("desc");

  const API_BASE_URL = "https://sociallogin-tyc7.onrender.com";

  // ✅ 백엔드 데이터 불러오기 (검색 + 정렬)
  useEffect(() => {
    fetch(`${API_BASE_URL}/admin/users?page=0&size=30&sortField=${sortField}&direction=${direction}`, {
      credentials: 'include', // 로그인 세션 유지
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.content.map((user) => ({
          id: user.id,
          name: user.name || '-',
          age: user.age || '-',
          gender: user.gender || '-',
          email: user.email || '-',
          userId: user.socialId || '-', // 모바일용 userId 필드 대체
          info: user.provider || '-',   // provider를 info에 표시
          createdAt: user.createdAt || '-', // 정렬된 가입일 표시
        }));
        setUsers(formatted);
      })
      .catch((err) => console.error('모바일 유저 목록 불러오기 실패:', err));
  }, [sortField, direction]);

  // ✅ 검색 필터링
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ 정렬 변경 핸들러 (드롭다운)
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "createdAt_desc") {
      setSortField("createdAt");
      setDirection("desc");
    } else if (value === "createdAt_asc") {
      setSortField("createdAt");
      setDirection("asc");
    } else if (value === "name_asc") {
      setSortField("name");
      setDirection("asc");
    } else if (value === "name_desc") {
      setSortField("name");
      setDirection("desc");
    }
  };

  return (
    <div className="mobile-dashboard">
      <LogoSection />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ✅ 정렬 드롭다운 */}
      <div style={{ textAlign: "right", margin: "10px 0" }}>
        <select onChange={handleSortChange} value={`${sortField}_${direction}`}>
          <option value="createdAt_desc">가입일 ↓</option>
          <option value="createdAt_asc">가입일 ↑</option>
          <option value="name_asc">이름 A→Z</option>
          <option value="name_desc">이름 Z→A</option>
        </select>
      </div>

      <UserList users={filteredUsers} />
    </div>
  );
}
