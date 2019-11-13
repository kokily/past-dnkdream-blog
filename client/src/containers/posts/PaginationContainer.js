import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = ({ location }) => {
  const { posts, lastPage, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    lastPage: posts.lastPage,
    loading: loading['posts/LIST_POSTS'],
  }));

  if (!posts || posts.length === 0) return null;

  if (loading) return null;

  const { page = 1, tag } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return <Pagination page={parseInt(page, 10)} tag={tag} lastPage={lastPage} />;
};

export default withRouter(PaginationContainer);
