import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import MarkdownRender from '../common/MarkdownRender';

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  font-size: 1.2rem;
  .title {
    font-size: 2.5rem;
    font-weight: 600;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid ${oc.gray[6]};
  }
`;

const WritePreview = ({ title, body }) => {
  return (
    <Container>
      <h1 className="title">{title}</h1>
      <div>
        <MarkdownRender markdown={body} />
      </div>
    </Container>
  );
};

export default WritePreview;
