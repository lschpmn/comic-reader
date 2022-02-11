import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import TreeView from '@material-ui/lab/TreeView';
import { basename } from 'path';
import React, { useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useChangeDirAction, useSetSelectedAction } from '../../../redux/actions';
import { ReduxStore } from '../../../types';
import FileItem from './FileItem';

export default () => {
  const changeDirAction = useChangeDirAction();
  const setSelectedAction = useSetSelectedAction();
  const basePath = useSelector((store: ReduxStore) => store.basePath);
  const branches = useSelector((store: ReduxStore) => store.fileShrub[basePath]?.branches, shallowEqual);
  const selectedPath = useSelector((store: ReduxStore) => store.selectedPath);
  const classes = useStyles();

  const resetSelected = useCallback(() => setSelectedAction(''), [setSelectedAction]);

  return <Paper style={{ overflow: 'auto', width: '15rem' }}>
    <AppBar position="relative" style={{ height: 'auto' }}>
      <Toolbar style={{ height: '2rem', padding: 0, minHeight: 'auto' }}>
        <IconButton
          onClick={changeDirAction}
          style={{ borderRadius: 0, position: 'relative', padding: '0.25rem' }}
        >
          <FolderOpenIcon/>
        </IconButton>
        <span className={classes.pathTitle} onClick={resetSelected}>{basename(basePath)}</span>
      </Toolbar>
    </AppBar>

    <TreeView
      disableSelection
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      defaultEndIcon={<ChevronRightIcon/>}
      selected={[selectedPath]}
    >
      {branches && (
        <FileItem
          path={basePath}
        />
      )}
    </TreeView>
  </Paper>;
};

const useStyles = makeStyles({
  pathTitle: {
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'center',
  },
});
