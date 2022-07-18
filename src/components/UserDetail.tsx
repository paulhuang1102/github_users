import React from "react";
import styled from "styled-components";
import { GithubUserDetail } from "../models/github";

interface Props {
  user: GithubUserDetail;
}

const UserDetail: React.FC<Props> = ({ user }) => (
  <SCDetail>
    <div>
      <img src={user.avatar_url} alt={user.login} />
    </div>

    <div>
      <div>Is Admin</div>
      <div>{user.site_admin ? "true" : "false"}</div>
    </div>

    <div>
      <div>Login</div>
      <div>
        <div>{user.login}</div>
      </div>
    </div>

    <div>
      <div>Name</div>
      <div>{user.name}</div>
    </div>

    <div>
      <div>Location</div>
      <div>{user.location}</div>
    </div>

    <div>
      <div>Bio</div>
      <div>{user.bio}</div>
    </div>

    {user.blog && (
      <a href={user.blog} target="__blank">
        {user.blog}
      </a>
    )}
  </SCDetail>
);

export default UserDetail;

const SCDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 100%;
  }

  > div {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-bottom: 1px solid #ccc;
    max-width: 400px;

    > div:first-child {
      border-right: #555 1px solid;
      margin-right: 1rem;
      padding-right: 0.5rem;
      color: #555;
    }
  }

  > a {
    text-align: center;
    margin-top: 2rem;
  }
`;
