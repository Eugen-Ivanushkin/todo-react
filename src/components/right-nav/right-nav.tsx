import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { GetIsAuth } from 'selectors/user';

//components
import { Link } from 'react-router-dom';

interface Props {
  open: boolean;
}

interface styledProps extends Props {}

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  li a {
    text-decoration: none;
    color: #000;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }: styledProps) =>
      open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
    li a {
      text-decoration: none;
      color: #fff;
    }
  }
`;

const RightNav = ({ open }: Props) => {
  const isAuth = useSelector(GetIsAuth);

  return (
    <Ul open={open}>
      {!isAuth && (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Register</Link>
          </li>
        </>
      )}
      {isAuth && (
        <>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/user/info">User Info</Link>
          </li>
        </>
      )}
    </Ul>
  );
};

export default RightNav;
