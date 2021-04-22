import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { getDefaultPath, listFiles } from '../lib/fileService';

export default () => {
  const [path, setPath] = useState([]);
  const [files, setFiles] = useState([]);
  console.log(path);

  useEffect(() => {
    getDefaultPath()
      .then(_path => setPath(_path))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (path.length === 0) return;
    listFiles(path)
      .then(_files => setFiles(_files))
      .catch(console.log);
  }, [path]);

  return <Paper style={{ width: '15rem' }}>
    <h3 style={{ margin: 0 }}>Files!</h3>
    <TreeView
      disableSelection
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      defaultEndIcon={<ChevronRightIcon/>}
    >
      <TreeItem nodeId="1" label="test">
        <TreeItem nodeId="2" label="inside" onClick={() => console.log('clicked')}/>
      </TreeItem>
      {files.map(file => (
        <TreeItem key={file} nodeId={file} label={file} />
      ))}
    </TreeView>
  </Paper>;
};
