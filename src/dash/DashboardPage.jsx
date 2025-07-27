import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import AccountTable from './AccountTable';
import Pagination from './Pagination';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // ✅ 로그인 사용자 정보

  const itemsPerPage = 9;

  // ✅ 현재 로그인 사용자 정보 가져오기
  useEffect(() => {
    fetch("http://localhost:8083/auth/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setCurrentUser(data);
        }
      })
      .catch((err) => console.error("로그인 사용자 정보 불러오기 실패:", err));
  }, []);

  // ✅ 유저 목록 불러오기 (검색 + 페이지네이션)
  useEffect(() => {
    const keywordParam = searchTerm.trim() ? `&keyword=${searchTerm}` : '';

    fetch(`http://localhost:8083/admin/users?page=${currentPage - 1}&size=${itemsPerPage}${keywordParam}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP 오류! 상태: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const formattedData = data.content.map((user, index) => ({
          id: user.id,
          name: user.name || '-',
          email: user.email || '-',
          gender: user.gender || '-',
          age: user.age || '-',
          info: user.provider || '-',
          index: (currentPage - 1) * itemsPerPage + index + 1,
        }));
        setUsers(formattedData);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("❌ 유저 목록 불러오기 실패:", err));
  }, [currentPage, searchTerm]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <Sidebar isOpen={sidebarOpen} />
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userMenuOpen={userMenuOpen}
        toggleUserMenu={() => setUserMenuOpen(!userMenuOpen)}
        currentUser={currentUser} // ✅ 이름 전달
      />

      <div className={`container ${sidebarOpen ? 'shifted' : ''}`}>
        <h2>계정 관리</h2>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
        />

        <AccountTable data={users}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </AccountTable>
      </div>
    </div>
  );
}
