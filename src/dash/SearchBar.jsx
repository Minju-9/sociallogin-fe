import React from 'react';

function SearchBar({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ 새로고침 방지
    if (onSubmit) onSubmit();
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="이름 또는 아이디를 입력해주세요"
        value={value}
        onChange={onChange}      // ✅ 입력 중 실시간 필터링
        autoComplete="off"       // ✅ 모바일 자동완성 방지
      />
      <button type="submit">검색</button>
    </form>
  );
}

export default SearchBar;
