import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "react-modal";
import { fetchUser, fetchUsers } from "../slices/github";
import { AppState } from "../store";
import UserList from "../components/UserList";
import Pagination from "../components/Pagination";
import UserDetail from "../components/UserDetail";

const PAGE_SIZE = 20;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const github = useSelector((state: AppState) => state.github);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchUsers({
        since: 0,
        pageSize: PAGE_SIZE,
      })
    );
  }, [dispatch]);

  const handlePagination = useCallback((since: number) => {
    dispatch(
      fetchUsers({
        pageSize: PAGE_SIZE,
        since,
      })
    );
  }, [dispatch]);

  const handleClickUser = useCallback((name: string) => {
    setOpen(true);
    dispatch(fetchUser(name));
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [])

  return (
    <SCMain>
      <Pagination
        prev={github.prev}
        next={github.next}
        handlePagination={handlePagination}
      />
      {github.loading && <span>Loading...</span>}

      <UserList users={github.users} handleClickUser={handleClickUser} />

      <Modal
        isOpen={open}
        onRequestClose={closeModal}
      >
        {github.selectedUser && <UserDetail user={github.selectedUser} />}
      </Modal>
    </SCMain>
  );
};

export default Home;

const SCMain = styled.main`
  max-width: 1024px;
  margin: 0 auto;
  position: relative;

  > span {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 2rem;
    background-color: #ddd;
    border-radius: 50%;
    z-index: 999;
  }
`;
