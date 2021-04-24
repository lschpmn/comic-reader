import { makeStyles } from '@material-ui/core';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import SideMenu from './components/SideMenu';
import { FileContextComponent } from './contexts/FileContext';

const App = () => {
  const styles = useStyles();

  return (
    <FileContextComponent>
      <div className={styles.container}>
        <SideMenu/>
        <h1>Hello World</h1>
      </div>
    </FileContextComponent>
  );
};

const useStyles = makeStyles(({ palette }) => ({
  container: {
    backgroundColor: palette.background.default,
    color: palette.text.primary,
    display: 'flex',
    height: '100%',
    overflow: 'auto',
  },
}));

export default hot(App);
