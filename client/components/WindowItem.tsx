import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import { basename, relative } from 'path';
import React, { useCallback } from 'react';
import { FileShrub } from '../../types';
import { testImagePath } from '../lib/utils';

const port: number = (window as any).__PORT__;

type Props = {
  fileShrub: FileShrub,
  itemPath: string,
  setSelected: (path: string) => void,
  path: string,
};

export default ({ setSelected, fileShrub, itemPath, path }: Props) => {
  const { isFile } = fileShrub[itemPath];
  const isImage = testImagePath(itemPath);
  const classes = useStyles();

  const onClickCallback = useCallback(() => setSelected(itemPath), [setSelected, itemPath]);

  const firstImage = fileShrub[itemPath].branches?.find(testImagePath);
  const relativePath = relative(path, firstImage || itemPath);

  return <Button key={itemPath} className={classes.container} onDoubleClick={onClickCallback}>
    <div className={classes.icon}>
      {!isFile && !firstImage && (
        <FolderIcon/>
      )}
      {(!isFile && firstImage || isImage) && (
        <img
          loading="lazy"
          title={basename(itemPath)}
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          src={`http://localhost:${port}/static/${relativePath}`}
        />
      )}
      {isFile && !isImage && (
        <DescriptionIcon/>
      )}
    </div>
    <div className={classes.label}>{basename(itemPath)}</div>
  </Button>;
};

const useStyles = makeStyles({
  container: {
    height: '17rem',
    margin: '0.5rem',
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
    height: '15rem',
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
