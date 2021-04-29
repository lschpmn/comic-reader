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
    <div className={classes.icon}>
      {!isFile && !relativePath && (
        <FolderIcon/>
      )}
      {!isFile && relativePath && (
        <img
          loading='lazy'
          title={basename(itemPath)}
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          src={`http://localhost:${port}/static/${relativePath}`}
        />
      )}
      {isFile && !isImage && (
        <DescriptionIcon/>
      )}
      {isImage && (
        <ImageIcon/>
      )}
    </div>
    <div className={classes.label}>{basename(itemPath)}</div>
  </Button>;
};

const useStyles = makeStyles({
  container: {
    height: '22rem',
    margin: '1rem',
    width: '15rem',
    '& > span': {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    '& svg': {
      fontSize: '10rem',
    },
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '20rem',
    justifyContent: 'center',
    width: '15rem',
  },
  label: {
    height: '2rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
});
