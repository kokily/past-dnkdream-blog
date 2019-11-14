import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/style';

const HeaderContainer = styled.div`
  background: ${oc.cyan[4]};
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  .right {
    margin-left: auto;
  }
`;

const Button = styled.button`
  text-decoration: none;
  font-weight: 800;
  color: ${oc.cyan[6]};
  border: 1px solid ${oc.cyan[6]};
  border-radius: 10px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background: ${oc.blue[6]};
    color: white;
    ${shadow(1)};
  }
  &:active {
    transform: translateY(3px);
  }
  & + & {
    margin-left: 0.5rem;
  }
`;

const WriteHeader = ({ onBack, onUpload, onSubmit }) => {
  return (
    <HeaderContainer>
      <div className="left">
        <Button onClick={onBack}>뒤 로</Button>
      </div>
      <div className="right">
        <Button onClick={onUpload}>이미지 업로드</Button>
        <Button onClick={onSubmit}>저장하기</Button>
      </div>
    </HeaderContainer>
  );
};
export default WriteHeader;
