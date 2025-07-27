import React from 'react';
import UserCard from './UserCard';

export default function UserList({ users }) {
  return (
    <div className="mobile-user-list">
      {users.length > 0 ? (
        users.map((user, index) => (
          <UserCard key={user.id} user={{ ...user, index }} />
        ))
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>데이터가 없습니다.</p>
      )}
    </div>
  );
}
