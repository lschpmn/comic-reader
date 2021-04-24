import TreeItem from '@material-ui/lab/TreeItem';
import React, { useCallback, useState } from 'react';
import { FileTree } from '../../types';
import { listFiles } from '../lib/fileService';
import FileTreeItem from './FileTreeItem';

type Props = {
  changePath: (path: string[]) => void,
  path: string[],
  tree: FileTree,
};

export default ({ changePath, tree, path }: Props) => {
  const [_tree, setTree] = useState({ isFile: false } as FileTree);

  const expand = useCallback((_path: string[]) => {
    listFiles(_path)
      .then(files => {
        const fileTree = files?.reduce((obj, file) => ({ ...obj, [file]: { isFile: false } }), {});
        if (fileTree) {
          setTree({
            ..._tree,
            fileTree,
          });
        } else {
          setTree({ isFile: true });
        }

        console.log('fileTree');
        console.log(fileTree);
      });
  }, []);

  return <>
    {Object.keys(tree.fileTree).map(file => (
      <TreeItem
        endIcon={tree.isFile && <span/>}
        key={file}
        nodeId={file}
        onClick={() => expand([...path, file])}
        onDoubleClick={() => changePath([...path, file])}
        label={file}
      >
        {_tree.fileTree && (
          <FileTreeItem
            changePath={changePath}
            path={path}
            tree={tree}
          />
        )}
      </TreeItem>
    ))}
  </>;
};
