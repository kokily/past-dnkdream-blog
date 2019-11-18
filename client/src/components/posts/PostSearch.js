import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { desktop, shadow } from '../../lib/style';

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${oc.gray[4]};
  padding-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Form = styled.form`
  display: flex;
  overflow: hidden;
  border: 1px solid ${oc.cyan[9]};
  border-radius: 4px;
  margin-right: 1rem;
  ${shadow(1)};
  ${desktop`width: 450px;`};
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  input {
    padding: 0.5rem;
    flex: 1;
    color: ${oc.cyan[8]};
    font-weight: 700;
    &::placeholder {
      color: ${oc.cyan[4]};
      font-weight: bold;
    }
  }
  button {
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;
    background: ${oc.cyan[6]};
    font-weight: bold;
    color: white;
    letter-spacing: 1px;
    transition: 0.3s;
    &:hover {
      background: ${oc.cyan[3]};
      color: ${oc.blue[9]};
    }
  }
`;

const PostSearch = ({ search, onChange, onSearch }) => {
  return (
    <Container>
      <Form onSubmit={onSearch}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={onChange}
          placeholder="제목을 검색하세요"
        />
        <button type="submit">검 색</button>
      </Form>
    </Container>
  );
};

export default PostSearch;
