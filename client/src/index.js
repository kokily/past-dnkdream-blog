import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './lib/modules';
import { tempSetUser, check } from './lib/modules/auth';

const sagaMiddlware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddlware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');

    if (!user) return;

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (err) {
    console.log('로컬 스토리지 미 작동 ', err);
  }
}

sagaMiddlware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root'),
);
