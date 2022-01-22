import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import { basename, relative } from 'path';
import React, { useCallback, useState } from 'react';
import { FileShrub } from '../../../types';
import { testImagePath } from '../../lib/utils';

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
  const [size, setSize] = useState(5);
  const calcSize = size * 50;
  const classes = useStyles({ size });

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
          src={`//localhost:${port}/static/${relativePath}?h=${calcSize}&w=${calcSize}`}
        />
      )}
      {isFile && !isImage && (
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
