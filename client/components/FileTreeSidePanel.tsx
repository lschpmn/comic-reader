import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import TreeView from '@material-ui/lab/TreeView';
import React, { useCallback, useEffect, useState } from 'react';
import { FileTree } from '../../types';
import { getDefaultPath, listFiles } from '../lib/fileService';
import FileTreeItem from './FileTreeItem';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export default () => {
  const [path, setPath] = useState([]);
  const [tree, setTree] = useState({ isFile: false } as FileTree);
  console.log(path);

  useEffect(() => {
    defaultPath();
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

  const changePath = useCallback(_path => setPath(_path), [setPath]);
  const defaultPath = useCallback(() =>
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log), [setPath]);

  return <Paper style={{ overflow: 'auto', width: '15rem' }}>
    <AppBar position="relative" style={{ height: 'auto' }}>
      <Toolbar style={{ height: '2rem', padding: 0, minHeight: 'auto' }}>
        <IconButton onClick={defaultPath} style={{ borderRadius: 0, position: 'relative', padding: 1 }}>
          <HomeIcon/>
        </IconButton>
        <IconButton onClick={() => changePath(path.slice(0, path.length - 1))} style={{ borderRadius: 0, position: 'relative', padding: 1 }}>
          <ArrowDropUpIcon/>
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
          changePath={changePath}
          path={path}
          tree={tree}
        />
      )}
    </TreeView>
  </Paper>;
};
