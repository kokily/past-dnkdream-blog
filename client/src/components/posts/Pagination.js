import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import PageButton from './PageButton';

const Container = styled.div`
  width: 320px;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  .now {
    display: flex;
    align-items: center;
  }
`;

const queryLink = ({ page, tag }) => {
  const query = qs.stringify({ page, tag });
  return `/posts?${query}`;
};

const Pagination = ({ page, tag, lastPage }) => {
  return (
    <Container>
      <PageButton
        disabled={page === 1}
        to={page === 1 ? undefined : queryLink({ page: page - 1, tag })}
      >
        이전 페이지
      </PageButton>
      <div className="now">{page} 페이지</div>
      <PageButton
        disabled={page === lastPage}
        to={page === lastPage ? undefined : queryLink({ page: page + 1, tag })}
      >
        다음 페이지
      </PageButton>
    </Container>
  );
};

export default Pagination;
