import React from "react";

interface Props {
  prev: number | null;
  next: number | null;
  handlePagination: (e: React.MouseEvent<HTMLElement>) => void;
}

const Pagination: React.FC<Props> = ({ prev, next, handlePagination }) => (
  <div>
    {prev !== null && (
      <button onClick={handlePagination} data-since={prev}>
        Prev
      </button>
    )}

    {next !== null && (
      <button onClick={handlePagination} data-since={next}>
        Next
      </button>
    )}
  </div>
);

export default Pagination;
