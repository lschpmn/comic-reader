import { makeStyles } from '@material-ui/core';
import React from 'react';
import { hot } from 'react-hot-loader/root';

const App = () => {
  const styles = useStyles();

  return <div className={styles.container}>
    <h1>Hello World</h1>
  </div>;
};

const useStyles = makeStyles(({ palette }) => ({
  container: {
    backgroundColor: palette.background.default,
    color: palette.text.primary,
    height: '100%',
    overflow: 'auto',
  },
}));

export default hot(App);
