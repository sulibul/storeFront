import React from "react";

interface props {
  productsPerPage: number;
  length: number;
  handlePagination: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  productsPerPage,
  length,
  handlePagination,
  currentPage,
}: props) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((data) => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={currentPage === data ? "active" : ""}
        >
          {data}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
