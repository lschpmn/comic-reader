import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

export default () => {
  const styles = useStyles();
  console.log(styles);

  return <Paper className={styles.container}>
    <IconButton className={styles.icons} size="small">
      <AccountTreeIcon fontSize="small"/>
    </IconButton>
    <span style={{ flex: 1 }}/>
    <IconButton className={styles.icons} size="small">
      <SettingsIcon fontSize="small"/>
    </IconButton>
  </Paper>;
};

const useStyles = makeStyles(({ palette }) => ({
  container: {
    backgroundColor: palette.grey['900'],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '2rem',
  },
  icons: {
    borderRadius: 0,
    height: '2rem',
    width: '2rem',
  },
}));
