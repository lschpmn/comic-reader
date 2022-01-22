import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { combinedReducers } from './redux/reducers';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

render(
  <Provider store={createStore(combinedReducers)}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>
  , document.getElementById('app'));
