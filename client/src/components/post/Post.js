import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Helmet } from 'react-helmet-async';

import Tags from '../common/Tags';
import MarkdownRender from '../common/MarkdownRender';
import { desktop, shadow } from '../../lib/style'

const PostBlock = styled.div`
  margin-top: 4rem;
`;

const PostHeader = styled.div`
  ${desktop`
    width: 1200px;
    padding-left: 15rem;
    padding-right: 15rem;
  `}
  margin-left: auto;
  margin-right: auto;
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
  margin-left: auto;
  margin-right: auto;
  ${desktop`
    width: 1200px;
    padding: 2rem 15rem;
  `}
  padding: 1rem 1rem;
  margin-top: 1rem;
  font-size: 1.125rem;
  color: ${oc.gray[8]};
  p {
    line-height: 2rem;
  }
  img {
    ${shadow(1)};
    margin: 3rem 0;
    padding: 0.3rem;
    filter: brightness(0.95);
    &:hover {
      ${shadow(2)};
      filter: brightness(1);
    }
  }
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
        <p>{new Date(createdAt).toLocaleDateString()} 작성</p>
      </PostHeader>

      {PostButton}

      <Content className="content">
        <MarkdownRender markdown={body} />
      </Content>
    </PostBlock>
  );
};

export default Post;
