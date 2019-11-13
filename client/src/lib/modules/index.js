import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import posts, { postsSaga } from './posts';

const rootReducer = combineReducers({
  loading,
  auth,
  posts,
});

export function* rootSaga() {
  yield all([authSaga(), postsSaga()]);
}

export default rootReducer;
