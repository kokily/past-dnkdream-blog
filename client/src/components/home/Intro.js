import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { mobile, shadow } from '../../lib/style';

const Container = styled.div`
  background: ${oc.gray[0]};
  max-width: 920px;
  height: 480px;
  margin: auto;
  transform: translateY(15%);
  ${shadow(2)};
  ${mobile`height: auto;`};
  .detail {
    position: relative;
    display: flex;
    ${mobile`flex-direction: column;`};
  }
  .clear {
    clear: both;
  }
`;

const Circles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: ${oc.teal[3]};
    left: -6%;
    top: -8%;
    border-radius: 50%;
  }
  &:after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: ${oc.teal[3]};
    right: -11%;
    bottom: -15%;
    border-radius: 50%;
  }
`;

const Avatar = styled.div`
  margin: 10px auto;
  position: relative;
  float: left;
  padding: 20px;
  animation: 1s ease-out 0s 1 slideInFromLeft;
  img {
    width: 240px;
    margin-top: -70px;
    border: 10px solid ${oc.cyan[5]};
    ${shadow(2)};
    ${mobile`width: 300px;`};
  }
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;

const About = styled.div`
  float: right;
  padding: 20px;
  margin-top: 50px;
  animation: 1s ease-out 0s 1 slideUpFromBottom;
  ${mobile`margin-top: 10px;`};
  @keyframes slideUpFromBottom {
    0% {
      transform: translateY(70%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .name {
    p {
      margin: 0;
      color: ${oc.gray[9]};
      font-size: 1.1em;
      font-weight: bold;
    }
    h1 {
      color: ${oc.cyan[5]};
      font-weight: bold;
      margin: 0;
      font-size: 3em;
    }
  }
`;

const Content = styled.div`
  p {
    line-height: 1.6em;
  }
  button {
    border: none;
    color: ${oc.gray[0]};
    background: ${oc.cyan[5]};
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    width: 250px;
    height: 40px;
    ${shadow(1)};
    transition: 0.2s all;
    &:hover {
      ${shadow(2)};
    }
    &:focus,
    &:active {
      ${shadow(3)};
    }
  }
`;

const Skill = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding: 20px;
  animation: 1s ease-in 0s 1 fadeIn;
  button {
    flex: 1;
    padding: 10px;
    margin: 5px;
    border: none;
    color: ${oc.gray[0]};
    background: ${oc.teal[5]};
    cursor: unset;
    font-weight: bold;
    width: 250px;
    height: 40px;
    ${shadow(1)};
    transition: 0.2s all;
    &:hover {
      ${shadow(2)};
    }
    &:focus,
    &:active {
      ${shadow(3)};
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Intro = ({ img, username, content, skill, onGithub }) => {
  return (
    <Container>
      <Circles />
      <div className="detail">
        <Avatar>
          <img src={img} alt="" />
        </Avatar>
        <About>
          <div className="name">
            <p>어서 오세요~!!</p>
            <h1>{username} 입니다.</h1>
          </div>
          <Content>
            <p>{content}</p>
            <button onClick={onGithub}>Github 저장소</button>
          </Content>
        </About>
        <div className="clear" />
      </div>
      <Skill>{skill && skill.map(s => <button key={s}>{s}</button>)}</Skill>
    </Container>
  );
};

export default Intro;
