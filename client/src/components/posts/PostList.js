import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import removeMd from 'remove-markdown';

import { shadow } from '../../lib/style';
import Tags from '../common/Tags';

const PostListBlock = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const PostCardBlock = styled.div`
  background: white;
  border-radius: 5px;
  ${shadow(2)};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  img {
    width: 100%;
    height: 180px;
    -webkit-filter: brightness(0.7);
    filter: brightness(0.7);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
    &:hover {
      -webkit-filter: brightness(1);
      filter: brightness(1);
    }
  }
  .title {
    cursor: pointer;
    &:hover {
      color: ${oc.gray[7]};
    }
  }
`;

const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${oc.gray[9]};
  }
  .text {
    flex: 1 1 auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const PostItem = ({ post, onPost }) => {
  return (
    <PostCardBlock>
      {post.thumbnail ? (
        <img src={`${post.thumbnail}`} alt="" onClick={() => onPost(post._id)} />
      ) : (
        <img src="/images/bg.png" alt="" onClick={() => onPost(post._id)} />
      )}
      <Content>
        <div className="title" onClick={() => onPost(post._id)}>
          {post.title}
        </div>
        <p className="text">{removeMd(post.body)}</p>
        <Tags tags={post.tags} />
        <p className="date">{new Date(post.createdAt).toLocaleDateString()}</p>
      </Content>
    </PostCardBlock>
  );
};

const PostList = ({ posts, loading, error, onPost }) => {
  if (error) return <PostListBlock>에러 발생!!</PostListBlock>;

  return (
    <PostListBlock>
      {!loading &&
        posts &&
        posts.map(post => <PostItem key={post._id} post={post} onPost={onPost} />)}
    </PostListBlock>
  );
};

export default PostList;
