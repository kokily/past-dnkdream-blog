import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Helmet } from 'react-helmet-async';

import Tags from '../common/Tags';
import MarkdownRender from '../common/MarkdownRender';

const PostBlock = styled.div`
  margin-top: 4rem;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${oc.gray[4]};
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  h1 {
    font-size: 2.25rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const Content = styled.div`
  font-size: 1.3125rem;
  color: ${oc.gray[8]};
`;

const Post = ({ post, error, loading, PostButton }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostBlock>존재하지 않는 포스트입니다.</PostBlock>;
    }
    return <PostBlock>에러 발생!!</PostBlock>;
  }

  if (loading || !post) return null;

  const { title, body, createdAt, tags } = post;

  return (
    <PostBlock>
      <Helmet>
        <title>{title} - D&K 블로그</title>
      </Helmet>
      <PostHeader>
        <h1>{title}</h1>
        <Tags tags={tags} />
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </PostHeader>

      {PostButton}

      <Content>
        <MarkdownRender markdown={body} />
      </Content>
    </PostBlock>
  );
};

export default Post;
