import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { fetchUsers } from "../slices/github";
import { AppState } from "../store";
import UserList from '../components/UserList';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 20;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const github = useSelector((state: AppState) => state.github); 

  useEffect(() => {
    dispatch(
      fetchUsers({
        since: 0,
        pageSize: PAGE_SIZE,
      })
    );
  }, [dispatch]);

  const handlePagination = (since: number) => {
    dispatch(
      fetchUsers({
        pageSize: PAGE_SIZE,
        since
      })
    );
  };

  return (
    <SCMain>
      <Pagination
        prev={github.prev}
        next={github.next}
        handlePagination={handlePagination}
      />
      {github.loading && <span>Loading...</span>}

      <UserList users={github.users}/>
    </SCMain>
  )
};

export default Home;

const SCMain = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
`;

