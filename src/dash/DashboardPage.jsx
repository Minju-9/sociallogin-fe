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
  const [currentUser, setCurrentUser] = useState(null);

  const [sortField, setSortField] = useState("createdAt"); // 기본 정렬 필드
  const [direction, setDirection] = useState("desc"); // 기본 정렬 방향

  const itemsPerPage = 9;
  const API_BASE_URL = "https://sociallogin-tyc7.onrender.com";

  //  현재 로그인 사용자 정보
  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/user`, {
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

  // 유저 목록 불러오기 (검색 + 페이지네이션 + 정렬)
  useEffect(() => {
    const keywordParam = searchTerm.trim() ? `&keyword=${searchTerm}` : '';

    fetch(
      `${API_BASE_URL}/admin/users?page=${currentPage - 1}&size=${itemsPerPage}&sortField=${sortField}&direction=${direction}${keywordParam}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
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
          createdAt: user.createdAt || '-',
          index: (currentPage - 1) * itemsPerPage + index + 1,
        }));
        setUsers(formattedData);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("❌ 유저 목록 불러오기 실패:", err));
  }, [currentPage, searchTerm, sortField, direction]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  // 정렬 토글 핸들러
  const handleSort = (field) => {
    if (sortField === field) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setDirection("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <Sidebar isOpen={sidebarOpen} />
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userMenuOpen={userMenuOpen}
        toggleUserMenu={() => setUserMenuOpen(!userMenuOpen)}
        currentUser={currentUser}
      />

      <div className={`container ${sidebarOpen ? 'shifted' : ''}`}>
        <h2>계정 관리</h2>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
        />

        <AccountTable
          data={users}
          onSort={handleSort}          
          sortField={sortField}        
          direction={direction}        
        >
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