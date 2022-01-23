import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import { loggingMiddleware } from './redux/middleware';
import reducer from './redux/reducers';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const store = createStore(reducer, undefined, applyMiddleware(loggingMiddleware));

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>
  , document.getElementById('app'));
