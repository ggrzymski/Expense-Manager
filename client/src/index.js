import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import showModalReducer from './reducers/ModalReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Routes from './routes/routes';

const store = createStore(showModalReducer);

const jsx = (
    <Provider store ={store}>
      <Routes />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
