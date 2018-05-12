import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import showModalReducer from './reducers/ModalReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(showModalReducer);

const jsx = (
    <Provider store ={store}>
        <App />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
