import makeStyles from '@material-ui/core/styles/makeStyles';
import TreeItem from '@material-ui/lab/TreeItem';
import { basename } from 'path';
import React, { useContext } from 'react';
import { FileShrub } from '../../types';
import FileContext from '../contexts/FileContext';
import FileItem from './FileItem';

type Props = {
  fileShrub: FileShrub,
  path: string,
};

export default ({ fileShrub, path }: Props) => {
  const classes = useStyles();
  const { expand } = useContext(FileContext);

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
        onClick={() => expand(node)}
        label={basename(node)}
        style={{
          textOverflow: 'ellipsis',
        }}
      >
        {!fileShrub[node].isFile && (
          <FileItem
            path={node}
            fileShrub={fileShrub}
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
