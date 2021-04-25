import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { IMAGE_TYPES } from '../../constants';
import FileContext from '../contexts/FileContext';
import FolderIcon from '@material-ui/icons/Folder';
import { basename, extname } from 'path';
import ImageIcon from '@material-ui/icons/Image';
import { useNodes } from '../lib/utils';
import DescriptionIcon from '@material-ui/icons/Description';

export default () => {
  const { fileShrub, path } = useContext(FileContext);
  const classes = useStyles();

  const [directories, files] = useNodes(fileShrub, fileShrub[path]?.branches);

  return <div className={classes.container}>
    {directories.map(directory => (
      <div key={directory}>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <FolderIcon />
        </IconButton>
        <div>{basename(directory)}</div>
      </div>
    ))}
    {files.map(file => (
      <div key={file}>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          {IMAGE_TYPES.includes(extname(file).toLowerCase()) ? (
            <ImageIcon/>
          ) : (
            <DescriptionIcon />
          )}
        </IconButton>
        <div>{basename(file)}</div>
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
