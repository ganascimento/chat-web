import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from './store/index';
import './index.css';
import PrivateRoute from './util/routes';
import Chat from './pages/Chat/index';
import Login from './pages/Login/index';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route exact path="/chat" component={Login} />
        <PrivateRoute exact path="/talk" component={Chat} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);