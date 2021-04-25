import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';
import { basename, extname } from 'path';
import React, { useContext } from 'react';
import { IMAGE_TYPES } from '../../constants';
import DescriptionIcon from '@material-ui/icons/Description';
import FileContext from '../contexts/FileContext';

type Props = {
  path: string,
};

export default ({ path }: Props) => {
  const { fileShrub } = useContext(FileContext);
  const { isFile } = fileShrub[path];
  const isImage = IMAGE_TYPES.includes(extname(path).toLowerCase());
  const classes = useStyles();

  return <div key={path} className={classes.container}>
    {!isFile && (
      <>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <FolderIcon/>
        </IconButton>
        <div>{basename(path)}</div>
      </>
    )}
    {isFile && !isImage && (
      <>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <DescriptionIcon/>
        </IconButton>
        <div>{basename(path)}</div>
      </>
    )}
    {isImage && (
      <>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <ImageIcon/>
        </IconButton>
        <div>{basename(path)}</div>
      </>
    )}
  </div>;
};

const useStyles = makeStyles({
  container: {
    width: '8rem',
    '& svg': {
      fontSize: '6rem',
    },
  },
});
