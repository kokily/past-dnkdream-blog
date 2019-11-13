import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { NavLink } from 'react-router-dom';

import { desktop, shadow } from '../../lib/style';

const AsideContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 0px;
  background: ${oc.cyan[5]};
  color: ${oc.gray[0]};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  ${shadow(3)};
  &.active {
    z-index: 10;
    width: 200px;
  }
  ${desktop`
    z-index: 10;
    width: 200px;
    &.active {
      width: 0px;
    }
  `};
  ul {
    min-width: 200px;
    list-style: none;
    li {
      margin-bottom: 10px;
    }
  }
`;

const Brand = styled.div`
  min-width: 200px;
  padding: 50px 20px;
  box-sizing: border-box;
  text-align: right;
  cursor: pointer;
  transition: 0.3s ease all;
  &:hover {
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6);
  }
  span {
    display: block;
    &.title {
      font-size: 1.5rem;
      font-weight: 600;
    }
    &.myName {
      font-weight: 600;
      color: rgba(247, 247, 247, 0.6);
    }
  }
`;

const Toggle = styled.button`
  position: fixed;
  z-index: 15;
  top: 20px;
  right: 20px;
  width: 38px;
  height: 38px;
  background: ${oc.gray[0]};
  border: none;
  padding: 0;
  ${shadow(2)}
  ${desktop`
    display: none;
  `};
`;

const Menu = styled(NavLink)`
  text-decoration: none;
  height: 42px;
  line-height: 42px;
  display: block;
  font-weight: bold;
  border-left: 3px solid transparent;
  padding: 0 0 0 24px;
  cursor: pointer;
  transition: 0.3s ease all;
  color: ${oc.indigo[9]};
  &.active {
    color: ${oc.gray[0]};
    border-left: 2px solid ${oc.indigo[9]};
  }
  .fa {
    margin-right: 20px;
  }
  &:hover,
  &:focus {
    color: ${oc.gray[0]};
    outline: none;
  }
`;

const ActionButton = styled.div`
  background: ${oc.blue[6]};
  color: ${oc.gray[0]};
  margin: 2rem 2rem;
  padding: 1rem 1.5rem;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  ${shadow(1)};
  transition: 0.3 ease all;
  &:hover {
    color: ${oc.blue[8]};
    background: ${oc.blue[2]};
  }
  &:focus,
  &:active {
    background: ${oc.blue[3]};
  }
`;

const Aside = ({ user, toggle, onBrand, onToggle, onWrite, onLogout }) => {
  return (
    <header>
      <AsideContainer className={toggle === true ? 'active' : ''}>
        <Brand onClick={onBrand}>
          <span className="title">D&K Dream</span>
          <span className="myName">by... KOKILY</span>
        </Brand>
        <Toggle onClick={onToggle}>
          <i className="fa fa-bars"></i>
        </Toggle>
        <ul>
          <li>
            <Menu exact to="/" activeClassName="active">
              <i className="fa fa-home"></i> 홈으로
            </Menu>
          </li>
          <li>
            <Menu to="/posts" activeClassName="active">
              <i className="fa fa-file-text-o"></i> 포스트
            </Menu>
          </li>
        </ul>
        {user && (
          <>
            <ActionButton onClick={onWrite}>글 작성</ActionButton>
            <ActionButton onClick={onLogout}>로그아웃</ActionButton>
          </>
        )}
      </AsideContainer>
    </header>
  );
};

export default Aside;
