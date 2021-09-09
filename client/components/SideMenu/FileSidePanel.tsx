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
import React, { useCallback, useContext } from 'react';
import FileContext from '../../contexts/FileContext';
import FileItem from './FileItem';

export default () => {
  const { changeDir, expand, fileShrub, path, selected, setSelected } = useContext(FileContext);
  const classes = useStyles();

  const resetSelected = useCallback(() => setSelected(''), [setSelected]);

  return <Paper style={{ overflow: 'auto', width: '15rem' }}>
    <AppBar position="relative" style={{ height: 'auto' }}>
      <Toolbar style={{ height: '2rem', padding: 0, minHeight: 'auto' }}>
        <IconButton
          onClick={changeDir}
          style={{ borderRadius: 0, position: 'relative', padding: '0.25rem' }}
        >
          <FolderOpenIcon/>
        </IconButton>
        <span className={classes.pathTitle} onClick={resetSelected}>{basename(path)}</span>
      </Toolbar>
    </AppBar>

    <TreeView
      disableSelection
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      defaultEndIcon={<ChevronRightIcon/>}
      selected={[selected]}
    >
      {fileShrub[path]?.branches && (
        <FileItem
          expand={expand}
          fileShrub={fileShrub}
          path={path}
          setSelected={setSelected}
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