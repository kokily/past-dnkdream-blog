import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    text-decoration: none;
    display: inline-block;
    color: ${oc.cyan[8]};
    margin-right: 0.5rem;
    &:hover {
      color: ${oc.cyan[4]};
    }
  }
`;

const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map(tag => (
        <Link key={tag} to={`/posts?tag=${tag}`} className="tag">
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
