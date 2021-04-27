import Button from '@material-ui/core/Button';
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

  return <Button key={itemPath} className={classes.container}>
    <>
      {!isFile && !relativePath && (
        <FolderIcon/>
      )}
      {!isFile && relativePath && (
        <img
          title={basename(itemPath)}
          style={{ maxHeight: '10rem', width: '7rem' }}
          src={`http://localhost:${port}/static/${relativePath}`}
        />
      )}
      {isFile && !isImage && (
        <DescriptionIcon/>
      )}
      {isImage && (
        <ImageIcon/>
      )}
    </>
    <div className={classes.label}>{basename(itemPath)}</div>
  </Button>;
};

const useStyles = makeStyles({
  container: {
    height: '12rem',
    padding: '0.25rem',
    width: '8rem',
    '& > span': {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    '& svg': {
      fontSize: '6rem',
    },
  },
  label: {
    height: '1.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
});
