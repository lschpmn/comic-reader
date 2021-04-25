import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';
import { basename, relative } from 'path';
import React, { useContext } from 'react';
import FileContext from '../contexts/FileContext';
import { testImagePath } from '../lib/utils';

const port: number = (window as any).__PORT__;

type Props = {
  itemPath: string,
};

export default ({ itemPath }: Props) => {
  const { fileShrub, path } = useContext(FileContext);
  const { isFile } = fileShrub[itemPath];
  const isImage = testImagePath(itemPath);
  const classes = useStyles();

  const firstImage = fileShrub[itemPath].branches?.find(testImagePath);
  const relativePath = firstImage && relative(path, firstImage);
  firstImage && console.log(firstImage);
  relativePath && console.log(relativePath);

  return <div key={itemPath} className={classes.container}>
    {!isFile && !relativePath && (
      <>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <FolderIcon/>
        </IconButton>
        <div>{basename(itemPath)}</div>
      </>
    )}
    {!isFile && relativePath && (
      <>
        <img
          style={{ maxHeight: '10rem', maxWidth: '7rem' }}
          src={`http://localhost:${port}/static/${relativePath}`}
        />
        <div>{basename(itemPath)}</div>
      </>
    )}

    {isFile && !isImage && (
      <>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <DescriptionIcon/>
        </IconButton>
        <div>{basename(itemPath)}</div>
      </>
    )}
    {isImage && (
      <>
        <IconButton style={{ borderRadius: 0, padding: '0 1rem' }} onClick={() => console.log('clicked')}>
          <ImageIcon/>
        </IconButton>
        <div>{basename(itemPath)}</div>
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
