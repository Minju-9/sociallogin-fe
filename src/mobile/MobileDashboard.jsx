import React, { useEffect, useState } from 'react';
import LogoSection from './components/LogoSection_Dash';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './mobile.css';

export default function MobileDashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ 백엔드 데이터 불러오기
  useEffect(() => {
    fetch('http://localhost:8083/admin/users', {
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
        }));
        setUsers(formatted);
      })
      .catch((err) => console.error('모바일 유저 목록 불러오기 실패:', err));
  }, []);

  // ✅ 검색 필터링
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mobile-dashboard">
      <LogoSection />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserList users={filteredUsers} />
    </div>
  );
}
