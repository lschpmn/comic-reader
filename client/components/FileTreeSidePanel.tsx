import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { getDefaultPath } from '../lib/fileService';

export default () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log('attempting to get files');
    getDefaultPath()
      .then(files => {
        console.log('got files');
        console.log(files);
        setFiles(files);
      })
      .catch(console.log);
  }, []);

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
