import TreeItem from '@material-ui/lab/TreeItem';
import React, { useCallback } from 'react';
import { FileTree } from '../../types';
import { listFiles } from '../lib/fileService';

type Props = {
  changePath: (path: string[]) => void,
  expand: (path: string[]) => void,
  path: string[],
  tree: FileTree,
};

export default ({ changePath, expand, path, tree }: Props) => {



  return <>
    {Object.keys(tree.fileTree).map(file => (
      <TreeItem
        endIcon={tree.isFile && <span/>}
        key={file}
        nodeId={file}
        onClick={() => expand([...path, file])}
        onDoubleClick={() => changePath([...path, file])}
        label={file}
      />
    ))}
  </>;
};
