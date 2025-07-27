import React from 'react';

function AccountTable({ data, children, onSort, sortField, direction }) {
  const renderSortIcon = (field) => {
    if (sortField !== field) return "↕";
    return direction === "ASC" ? "▲" : "▼";
  };

  return (
    <div className="account-table-wrapper">
      <table>
        <thead>
          <tr>
            <th>순번</th>
            <th onClick={() => onSort("name")}>이름 {renderSortIcon("name")}</th>
            <th onClick={() => onSort("email")}>이메일 {renderSortIcon("email")}</th>
            <th onClick={() => onSort("gender")}>성별 {renderSortIcon("gender")}</th>
            <th onClick={() => onSort("age")}>나이 {renderSortIcon("age")}</th>
            <th onClick={() => onSort("createdAt")}>가입일 {renderSortIcon("createdAt")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{String(user.index).padStart(2, '0')}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.createdAt || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">{children}</div>
    </div>
  );
}

export default AccountTable;
