import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { FileTree } from '../../types';
import { getDefaultPath, listFiles } from '../lib/fileService';
import FileTreeItem from './FileTreeItem';

export default () => {
  const [path, setPath] = useState([]);
  const [tree, setTree] = useState({ isFile: false } as FileTree);
  console.log(path);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (path.length === 0) return;
    listFiles(path)
      .then(_files => {
        const fileTree = _files.reduce((obj, file) =>
          ({ ...obj, [file]: { isFile: false }, }), {});

        setTree({
          ...tree,
          fileTree,
        });
      })
      .catch(console.log);
  }, [path]);

  return <Paper style={{ overflow: 'auto', width: '15rem' }}>
    <AppBar position="relative" style={{ height: 'auto' }}>
      <Toolbar style={{ height: '2rem', padding: 0, minHeight: 'auto' }}>
        <IconButton style={{ position: 'relative', left: '-0.5rem', padding: '0.5rem' }}>
          <HomeIcon/>
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
