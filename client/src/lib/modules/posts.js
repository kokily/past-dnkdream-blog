import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createSaga, { createActionTypes } from './createSaga';
import * as postsAPI from '../api/posts';

// 액션 타입
const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] = createActionTypes(
  'posts/LIST_POSTS',
);
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createActionTypes(
  'posts/READ_POST',
);
const UNLOAD_POST = 'posts/UNLOAD_POST';

// 액션 생성함수
export const listPosts = createAction(LIST_POSTS, ({ page, title, tag }) => ({
  page,
  title,
  tag,
}));
export const readPost = createAction(READ_POST, id => id);
export const unloadPost = createAction(UNLOAD_POST);

// 사가 생성
const listPostsSaga = createSaga(LIST_POSTS, postsAPI.listPosts);
const readPostSaga = createSaga(READ_POST, postsAPI.readPost);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
  yield takeLatest(READ_POST, readPostSaga);
}

// 상태 초기화
const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
  post: null,
};

// 액션 핸들러
const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default posts;