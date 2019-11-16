import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import PostContainer from '../containers/post/PostContainer';
import Utterences from 'react-utterances'

const repo = 'kokily/dnkdream-blog'

const PostPage = () => {
  return (
    <PageTemplate>
      <PostContainer />
      <Utterences repo={repo} type={'pathname'} />
    </PageTemplate>
  );
};

export default PostPage;
