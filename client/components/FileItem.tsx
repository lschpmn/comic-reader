import makeStyles from '@material-ui/core/styles/makeStyles';
import TreeItem from '@material-ui/lab/TreeItem';
import { basename } from 'path';
import React from 'react';
import { FileShrub } from '../../types';
import FileItem from './FileItem';

type Props = {
  expand: (path: string) => undefined,
  fileShrub: FileShrub,
  setSelected: (path: string) => undefined,
  path: string,
};

export default ({ expand, fileShrub, setSelected, path }: Props) => {
  const classes = useStyles();

  const nodes = fileShrub[path]?.branches || [];

  return <>
    {nodes.map(node => (
      <TreeItem
        classes={{
          label: classes.labels,
        }}
        endIcon={<span/>}
        key={node}
        nodeId={node}
        onIconClick={() => expand(node)}
        onLabelClick={(e) => {
          e.preventDefault();
          setSelected(node);
        }}
        label={basename(node)}
      >
        {!fileShrub[node].isFile && (
          <FileItem
            expand={expand}
            fileShrub={fileShrub}
            path={node}
            setSelected={setSelected}
          />
        )}
      </TreeItem>
    ))}
  </>;
};

const useStyles = makeStyles({
  labels: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
