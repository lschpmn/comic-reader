import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import FileContext from '../contexts/FileContext';
import FolderIcon from '@material-ui/icons/Folder';
import { basename } from 'path';

export default () => {
  const { fileShrub, path } = useContext(FileContext);
  const classes = useStyles();

  return <div className={classes.container}>
    {fileShrub[path]?.branches.map(branch => (
      <div key={branch}>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <FolderIcon />
        </IconButton>
        <div>{basename(branch)}</div>
      </div>
    ))}
  </div>
};

const useStyles = makeStyles({
  container: {
    alignContent: 'start',
    display: 'flex',
    overflow: 'auto',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: '100%',
    '& > div': {
      width: '8rem',
    },
    '& svg': {
      fontSize: '6rem',
    },
  },
});
