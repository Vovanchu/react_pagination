import React, { useEffect } from 'react';
import { getNumbers } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, pages);

  // Обробка випадку, коли currentPage виходить за межі
  useEffect(() => {
    if (currentPage > pages && pages > 0) {
      onChange(pages);
    }
  }, [currentPage, pages, onChange]);

  if (pages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (newPage >= 1 && newPage <= pages) {
      onChange(newPage);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pageNumbers.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((item, index) => (
            <li key={index} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
