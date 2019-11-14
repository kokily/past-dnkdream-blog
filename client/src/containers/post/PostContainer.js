import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { readPost, unloadPost } from '../../lib/modules/posts';
import { setOriginalPost } from '../../lib/modules/write';
import { removePost } from '../../lib/api/posts';
import Post from '../../components/post/Post';
import PostButton from '../../components/post/PostButton';

const PostContainer = ({ match, history }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(({ posts, loading, auth }) => ({
    post: posts.post,
    error: posts.error,
    loading: loading['posts/READ_POST'],
    user: auth.user,
  }));

  useEffect(() => {
    dispatch(readPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/posts');
    } catch (err) {
      console.log(err);
    }
  };

  const onBack = () => {
    history.push('/posts');
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <Post
      post={post}
      error={error}
      loading={loading}
      PostButton={
        ownPost && <PostButton onBack={onBack} onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(PostContainer);
