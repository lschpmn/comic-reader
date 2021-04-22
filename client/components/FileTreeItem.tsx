import TreeItem from '@material-ui/lab/TreeItem';
import React from 'react';
import { FileTree } from '../../types';

type Props = {
  path: string[],
  tree: FileTree,
};

export default ({ tree }: Props) => {

  return <>
    {Object.keys(tree.fileTree).map(file => (
      <TreeItem key={file} nodeId={file} label={file}/>
    ))}
  </>;
};
