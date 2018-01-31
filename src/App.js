import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import configureStore from './store/configureStore';

class App extends Component {
    render() {
        return (
            <Provider store={configureStore()}>
                <Router />
            </Provider>
        );
    }
}

export default App;
