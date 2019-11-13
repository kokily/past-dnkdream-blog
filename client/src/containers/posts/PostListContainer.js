import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { listPosts } from '../../lib/modules/posts';
import PostList from '../../components/posts/PostList';

const PostListContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
  }));

  const onPost = id => {
    history.push(`/post/${id}`);
  };

  useEffect(() => {
    const { page, title, tag } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ page, title, tag }));
  }, [dispatch, location.search]);

  return <PostList posts={posts} loading={loading} error={error} onPost={onPost} />;
};

export default withRouter(PostListContainer);
