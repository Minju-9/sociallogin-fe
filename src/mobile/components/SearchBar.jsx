import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="mobile-searchbar">
      <input
        type="text"
        className="mobile-search-input"
        placeholder="이름 또는 아이디를 입력해주세요"
        value={value}
        onChange={onChange}      
        autoComplete="off"      
      />
    </div>
  );
}

export default SearchBar;

