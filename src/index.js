import React from 'react'; 
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import {App} from './App'; 

import { configureFakeBackend, store } from './_helpers';

configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);