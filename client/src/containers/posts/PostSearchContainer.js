import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PostSearch from '../../components/posts/PostSearch';

const PostSearchContainer = ({ history }) => {
  const [search, setSearch] = useState('');

  const onChange = e => {
    setSearch(e.target.value);
  };

  const onSearch = e => {
    e.preventDefault();

    if (search === '') {
      history.push('/posts');
    } else {
      history.push(`/posts?title=${search}`);
    }
  };

  return <PostSearch search={search} onChange={onChange} onSearch={onSearch} />;
};

export default withRouter(PostSearchContainer);
