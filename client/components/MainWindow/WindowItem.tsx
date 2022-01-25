import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import { basename, dirname } from 'path';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { testImagePath, useFileShrubForPath } from '../../lib/utils';
import { useReadDirAction, useSetSelectedAction } from '../../redux/actions';
import { ReduxStore } from '../../types';

const port: number = (window as any).__PORT__;

type Props = {
  first: boolean,
  itemPath: string,
  size: number,
};

export default ({ first, itemPath, size }: Props) => {
  const dir = dirname(itemPath);
  const branches = useSelector((store: ReduxStore) => first && store.fileShrub[dir]?.branches);
  const fileShrub = useFileShrubForPath(first && dir);
  const setSelectedAction = useSetSelectedAction();
  const readDirAction = useReadDirAction();
  const node = useSelector((store: ReduxStore) => store.fileShrub[itemPath], shallowEqual);
  const [loading, setLoading] = useState('');
  const isImage = node.isFile && testImagePath(itemPath);
  const calcSize = size * 50;
  const classes = useStyles({ size });

  const firstImage = node.branches?.find(testImagePath);
  const fullPath = firstImage || itemPath;

  useEffect(() => {
    const notLoaded = branches?.find?.(branch => !fileShrub[branch].isFile && fileShrub[branch].branches === undefined);
    if (!!notLoaded && notLoaded !== loading) {
      setLoading(notLoaded);
      readDirAction(notLoaded);
    }
  }, [branches, fileShrub]);

  return <Button key={itemPath} className={classes.container} onDoubleClick={() => setSelectedAction(itemPath)}>
    <div className={classes.icon}>
      {!node.isFile && !firstImage && (
        <FolderIcon/>
      )}
      {(!node.isFile && firstImage || isImage) && (
        <img
          loading="lazy"
          title={basename(itemPath)}
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          src={`//localhost:${port}/static/image?h=${calcSize}&w=${calcSize}&p=${encodeURIComponent(fullPath)}`}
        />
      )}
      {node.isFile && !isImage && (
        <DescriptionIcon/>
      )}
    </div>
    <div className={classes.label}>{basename(itemPath)}</div>
  </Button>;
};

type StyleProps = {
  size: number,
};

const useStyles = makeStyles({
  container: ({ size }: StyleProps) => ({
    height: 'fit-content',
    padding: '0.75rem',
    '& > span': {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    '& svg': {
      fontSize: `${size * 2}rem`,
    },
  }),
  icon: ({ size }: StyleProps) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: size * 50,
    justifyContent: 'center',
    width: size * 50,
  }),
  label: ({ size }: StyleProps) => ({
    height: '1.25rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: size * 50,
  }),
});
