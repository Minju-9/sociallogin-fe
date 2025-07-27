import React from 'react';

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      {/* 필요 시 메뉴 항목 추가 가능 */}
      <ul className="sidebar-menu">
        {/* <li><a href="#">메뉴1</a></li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
