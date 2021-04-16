import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

render(
  <ThemeProvider theme={theme}><App/></ThemeProvider>
  , document.getElementById('app'));
