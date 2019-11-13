import qs from 'qs';
import client from './client';

// 포스트 작성 API
export const writePost = ({ title, body, tags, thumbnail }) =>
  client.post('/api/posts', { title, body, tags, thumbnail });

// 포스트 리스트 API
export const listPosts = ({ page, title, tag }) => {
  const queryString = qs.stringify({ page, title, tag });
  return client.get(`/api/posts?${queryString}`);
};

// 포스트 세부 보기 API
export const readPost = id => client.get(`/api/posts/${id}`);

// 포스트 삭제 API
export const removePost = id => client.delete(`/api/posts/${id}`);

// 포스트 수정 API
export const updatePost = ({ id, title, body, tags, thumbnail }) =>
  client.patch(`/api/posts/${id}`, { title, body, tags, thumbnail });
