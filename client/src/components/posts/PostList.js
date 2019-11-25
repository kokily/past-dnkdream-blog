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
  .card {
    width: 100%;
    height: 180px;
    -webkit-filter: brightness(0.9);
    filter: brightness(0.9);
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

const Avatar = styled.div`
  width: 78px;
  height: 78px;
  z-index: 9;
  position: relative;
  top: -45px;
  left: 10px;
  right: 0px;
  border: 4px solid #fff;
  
  background: #000;
  background-size: cover;
  border-radius: 50%;

  .avatar {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    ${shadow(1)};
  }
`;

const Content = styled.div`
  padding: 1rem;
  display: inline-block;
  .title {
    position: relative;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${oc.gray[9]};
    top: -48px;
  }
  .text {
    position: relative;
    font-size: 0.875rem;
    line-height: 1.4;
    top: -48px;
    margin-bottom: -2rem;
  }
`;

const PostItem = ({ post, onPost }) => {
  return (
    <PostCardBlock>
      {post.thumbnail ? (
        <img src={`${post.thumbnail}`} className="card" alt="" onClick={() => onPost(post._id)} />
      ):(
        <img src="/images/bg.png" className="card" alt="" onClick={() => onPost(post._id)} />
      )}
      <Avatar>
        <img src="/images/profile.jpg" className="avatar" alt="" />
      </Avatar>
      <Content>
        <div className="title" onClick={() => onPost(post._id)}>
          {post.title}
        </div>
        <p className="text">{removeMd(post.body)}</p>
        <Tags tags={post.tags} className="tags" />
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
