import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { FileTree } from '../../types';
import { getDefaultPath, getFileTree } from '../lib/fileService';
import { openPathDialog } from '../lib/utils';
import FileTreeItem from './FileTreeItem';

export default () => {
  const [path, setPath] = useState([]);
  const [tree, setTree] = useState({ isFile: false } as FileTree);
  console.log('tree');
  console.log(tree);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (path.length === 0) return;
    getFileTree(path)
      .then(setTree)
      .catch(console.log);
  }, [path]);

  return <Paper style={{ overflow: 'auto', width: '15rem' }}>
    <AppBar position="relative" style={{ height: 'auto' }}>
      <Toolbar style={{ height: '2rem', padding: 0, minHeight: 'auto' }}>
        <IconButton
          onClick={() => {
            openPathDialog(path)
              .then(console.log)
              .catch(console.log);
          }}
          style={{ borderRadius: 0, position: 'relative', padding: 1 }}
        >
          <FolderOpenIcon/>
        </IconButton>
        <span style={{ fontSize: '1rem', textAlign: 'center' }}>{path.slice(-1)[0]}</span>
      </Toolbar>
    </AppBar>

    <TreeView
      disableSelection
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      defaultEndIcon={<ChevronRightIcon/>}
    >
      {tree.fileTree && (
        <FileTreeItem
          path={path}
          tree={tree}
        />
      )}
    </TreeView>
  </Paper>;
};
