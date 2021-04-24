import TreeItem from '@material-ui/lab/TreeItem';
import React, { useCallback } from 'react';
import { FileTree } from '../../types';
import FileTreeItem from './FileTreeItem';

type Props = {
  path: string[],
  tree: FileTree,
};

export default ({tree, path }: Props) => {

  const expand = useCallback((_path: string[]) => {

  }, []);

  const nodes = Object.entries(tree.fileTree);
  const directories = nodes.filter(node => !node[1].isFile);
  const files = nodes.filter(node => node[1].isFile);

  return <>
    {directories.map(([directory, fileTree]) => (
      <TreeItem
        key={directory}
        nodeId={directory}
        onClick={() => expand([...path, directory])}
        label={directory}
      >
        {fileTree && (
          <FileTreeItem
            path={path}
            tree={tree}
          />
        )}
      </TreeItem>
    ))}

    {files.map(([file]) => (
      <TreeItem
        endIcon={<span/>}
        key={file}
        nodeId={file}
        onClick={() => expand([...path, file])}
        label={file}
      />
    ))}
  </>;
};
