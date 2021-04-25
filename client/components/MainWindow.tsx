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
        <FolderIcon />
        <div>{basename(branch)}</div>
      </div>
    ))}
  </div>
};

const useStyles = makeStyles({
  container: {
    alignContent: 'start',
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: '100%',
    '& > div': {
      margin: '1rem',
    },
    '& svg': {
      fontSize: '6rem',
    },
  },
});
