import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import TreeView from '@material-ui/lab/TreeView';
import React, { useContext } from 'react';
import FileTreeContext from '../contexts/FileTreeContext';
import FileTreeItem from './FileTreeItem';

export default () => {
  const { changeDir, path, tree } = useContext(FileTreeContext);

  return <Paper style={{ overflow: 'auto', width: '15rem' }}>
    <AppBar position="relative" style={{ height: 'auto' }}>
      <Toolbar style={{ height: '2rem', padding: 0, minHeight: 'auto' }}>
        <IconButton
          onClick={changeDir}
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
