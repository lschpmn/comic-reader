import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import MainWindow from './components/MainWindow';
import SideMenu from './components/SideMenu';
import { useGetDefaultPathAction } from './redux/actions';

const App = () => {
  const getDefaultPathAction = useGetDefaultPathAction();
  const styles = useStyles();

  useEffect(() => {
    getDefaultPathAction();
  }, []);

  return (
    <div className={styles.container}>
      <SideMenu/>
      <MainWindow/>
    </div>
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
