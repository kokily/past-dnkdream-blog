import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createSaga, { createActionTypes } from './createSaga';
import * as postsAPI from '../api/posts';

// 액션 타입
const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createActionTypes(
  'write/WRITE_POST',
);
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createActionTypes(
  'write/UPDATE_POST',
);

// 액션 생성함수
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const writePost = createAction(WRITE_POST, ({ title, body, tags, thumbnail }) => ({
  title,
  body,
  tags,
  thumbnail,
}));
export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags, thumbnail }) => ({ id, title, body, tags, thumbnail }),
);

// 사가 생성
const writePostSaga = createSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

// 상태 초기화
const initialState = {
  title: '',
  body: '',
  tags: [],
  thumbnail: '',
  post: null,
  postError: null,
  originalPostId: null,
};

// 액션 핸들러
const write = handleActions(
  {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      thumbnail: post.thumbnail,
      originalPostId: post._id,
    }),
    [WRITE_POST]: state => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default write;
