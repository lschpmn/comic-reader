import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import { basename } from 'path';
import React from 'react';
import { FileNode } from '../../../types';
import { testImagePath } from '../../lib/utils';

const port: number = (window as any).__PORT__;

type Props = {
  itemPath: string,
  node: FileNode,
  setSelectedAction: Function,
  size: number,
};

export default ({ itemPath, node, setSelectedAction, size }: Props) => {
  const isImage = node.isFile && testImagePath(itemPath);
  const calcSize = size * 50;
  const classes = useStyles({ size });

  const firstImage = node.branches?.find(testImagePath);
  const fullPath = firstImage || itemPath;

  // console.log(`render file item ${itemPath}`);

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
