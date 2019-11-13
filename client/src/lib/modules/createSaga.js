import { put, call } from 'redux-saga/effects';
import { startLoading, finishLoading } from './loading';

// 액션 타입 생성함수
export const createActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
};

// 사가 생성 함수
export default function createSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action) {
    // 로딩 시작
    yield put(startLoading(type));

    try {
      const response = yield call(request, action.payload);

      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (err) {
      yield put({
        type: FAILURE,
        payload: err,
        error: true,
      });
    }

    // 로딩 종료
    yield put(finishLoading(type));
  };
}
