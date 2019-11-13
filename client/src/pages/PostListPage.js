import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import PostSearchContainer from '../containers/posts/PostSearchContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
  return (
    <PageTemplate>
      <PostSearchContainer />
      <PostListContainer />
      <PaginationContainer />
    </PageTemplate>
  );
};

export default PostListPage;
