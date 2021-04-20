import Paper from '@material-ui/core/Paper';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';

export default () => {
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
    </TreeView>
  </Paper>;
};
