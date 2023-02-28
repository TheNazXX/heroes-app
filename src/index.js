import React from 'react';
import {createRoot} from 'react-dom/client';
import { createStore } from 'redux';
import App from './components/app/App';
import {reducer} from './reducer.js'
import { Provider } from 'react-redux';

import './style/index.scss';

const store = createStore(reducer)


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

