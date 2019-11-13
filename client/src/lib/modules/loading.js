import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// 액션 생성함수
export const startLoading = createAction(START_LOADING, requestType => requestType);
export const finishLoading = createAction(FINISH_LOADING, requestType => requestType);

// 상태 초기화
const initialState = {};

// 액션 핸들러
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
