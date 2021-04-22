import TreeItem from '@material-ui/lab/TreeItem';
import React from 'react';
import { FileTree } from '../../types';

type Props = {
  changePath: (file: string[]) => void,
  path: string[],
  tree: FileTree,
};

export default ({ changePath, path, tree }: Props) => {

  return <>
    {Object.keys(tree.fileTree).map(file => (
      <TreeItem
        key={file}
        nodeId={file}
        onClick={() => changePath([...path, file])}
        label={file}
      />
    ))}
  </>;
};
