import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { fileReducer } from './redux/file-redux';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

render(
  <Provider store={createStore(fileReducer)}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>
  , document.getElementById('app'));
