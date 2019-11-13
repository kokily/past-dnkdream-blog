import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../../lib/style';
import AsideContainer from '../../containers/common/AsideContainer';

const Main = styled.main`
  margin: 5rem 1rem;
`;

const PageTemplate = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <AsideContainer />
      <Main>{children}</Main>
    </>
  );
};

export default PageTemplate;
