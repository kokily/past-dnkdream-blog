import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import posts, { postsSaga } from './posts';
import write, { writeSaga } from './write';

const rootReducer = combineReducers({
  loading,
  auth,
  posts,
  write,
});

export function* rootSaga() {
  yield all([authSaga(), postsSaga(), writeSaga()]);
}

export default rootReducer;
