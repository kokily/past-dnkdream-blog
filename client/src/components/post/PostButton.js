import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

import { shadow } from '../../lib/style';
import PostModal from './PostModal';

const Container = styled.div`
  margin-top: -1rem;
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;
  ${props =>
    props.list &&
    css`
      border: 1px solid ${oc.cyan[6]};
      background: white;
      color: ${oc.cyan[6]};
      &:hover {
        background: ${oc.blue[6]};
        color: white;
        ${shadow(1)};
      }
    `}
  ${props =>
    props.edit &&
    css`
      border: 1px solid ${oc.violet[6]};
      background: white;
      color: ${oc.violet[6]};
      &:hover {
        background: ${oc.violet[6]};
        color: white;
        ${shadow(1)};
      }
    `}
  ${props =>
    props.remove &&
    css`
      border: 1px solid ${oc.red[6]};
      background: white;
      color: ${oc.red[6]};
      &:hover {
        background: ${oc.red[6]};
        color: white;
        ${shadow(1)};
      }
    `}
  
  &:active {
    transform: translateY(3px);
  }
  & + & {
    margin-left: 0.5rem;
  }
`;

const PostButton = ({ onBack, onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <Container>
        <Button list="true" onClick={onBack}>
          목록으로
        </Button>
        <Button edit="true" onClick={onEdit}>
          수 정
        </Button>
        <Button remove="true" onClick={onRemoveClick}>
          삭 제
        </Button>
      </Container>
      <PostModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
};

export default PostButton;
