import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    render() {
        const store = createStore(reducers, {}, applyMiddleware(createSagaMiddleware()));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
