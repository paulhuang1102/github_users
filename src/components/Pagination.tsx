import React, { useCallback } from "react";
import styled from 'styled-components';
interface Props {
  prev: number | null;
  next: number | null;
  handlePagination: (since: number) => void;
}

const Pagination: React.FC<Props> = ({ prev, next, handlePagination }) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const { dataset } = e.currentTarget;
      handlePagination(parseInt(dataset.since!));
    },
    [handlePagination]
  );

  return (
    <SCDiv>
      {prev !== null && (
        <button onClick={onClick} data-since={prev}>
          Prev
        </button>
      )}

      {next !== null && (
        <button onClick={onClick} data-since={next}>
          Next
        </button>
      )}
    </SCDiv>
  );
};

export default Pagination;

const SCDiv = styled.div`
  text-align: center;
  padding: 1rem;
`