import React from "react";
import styled from "styled-components";
import { GithubUser } from "../models/github";
interface Props {
  users: GithubUser[];
}

const UserList: React.FC<Props> = ({ users }) => (
  <SCUl>
    {users.map((user) => (
      <li key={user.id}>
        <img src={user.avatar_url} alt={user.login} />
        <div>
          <p>{user.login}</p>
        </div>

        <span className={user.site_admin ? "admin" : ""}>
          {user.site_admin ? "Admin" : " User"}
        </span>
      </li>
    ))}
  </SCUl>
);

export default UserList;

const SCUl = styled.ul`
  display: flex;
  flex-wrap: wrap;

  > li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(33.333333% - 2rem);
    padding: 1rem;
    align-items: center;
    position: relative;
    margin-bottom: 2rem;

    > img {
      width: 100%;
    }

    > span {
      background-color: #888;
      border-radius: 1.5rem;
      position: absolute;
      top: 0;
      right: 0;
      color: white;
      padding: 0.5rem 1rem;

      &.admin {
        background-color: #005ab5;
      }
    }
  }
`;
