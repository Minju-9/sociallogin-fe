import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (currentPage <= 4) {
    pages.push(1, 2, 3, 4, '...', totalPages);
  } else {
    pages.push(1, 2, 3, 4, '...', totalPages); // 추후 확장 가능
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
        &lt;
      </button>
      {pages.map((page, index) =>
        page === '...' ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            className={page === currentPage ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
