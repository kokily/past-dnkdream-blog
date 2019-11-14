import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const TagBoxContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  background: ${oc.gray[8]};
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  p {
    margin-right: 2rem;
  }
`;

const TagForm = styled.form`
  background: none;
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    background: none;
    color: rgba(255, 255, 255, 0.9);
    &::placeholder {
      color: rgba(255, 255, 255, 0.75);
    }
  }
  button {
    cursor: pointer;
    padding: 0.3rem 1rem;
    color: white;
    background: ${oc.cyan[4]};
    font-weight: bold;
    border-radius: 8px;
    font-size: 1rem;
    &:hover {
      background: ${oc.cyan[2]};
      color: ${oc.gray[9]};
    }
    &:active {
      transform: translateY(3px);
    }
  }
`;

const Tag = styled.div`
  cursor: pointer;
  &:hover {
    color: ${oc.cyan[4]};
  }
  & + & {
    margin-left: 1rem;
  }
`;

const TagListblock = styled.div`
  margin-left: 2rem;
  display: flex;
  justify-content: space-between;
`;

// Components
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListblock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListblock>
));

const WriteTagBox = ({ onChangeTags, tags }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const addTag = useCallback(
    tag => {
      if (!tag) return;
      if (localTags.includes(tag)) return;

      const nextTags = [...localTags, tag];

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);

      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      addTag(input.trim());
      setInput('');
    },
    [input, addTag],
  );

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxContainer>
      <p>태그</p>
      <TagForm onSubmit={onSubmit}>
        <input placeholder="엔터로 입력하세용" value={input} onChange={onChange} />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxContainer>
  );
};

export default WriteTagBox;
