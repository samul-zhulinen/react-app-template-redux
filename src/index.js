import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import store from './store/store';
import { Provider } from 'react-redux';
import 'normalize.css';
import 'ytu-mobile/dist/index.css';
import '@ytu-mf/ytu-mobile-biz/dist/index.css'

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);
