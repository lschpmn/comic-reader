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

render(
  <Provider store={createStore(reducer, undefined, applyMiddleware(loggingMiddleware))}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>
  , document.getElementById('app'));
