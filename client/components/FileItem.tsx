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

  const nodes = fileShrub[path].branches.sort(sortNames);
  const directories = nodes.filter(node => !fileShrub[node].isFile);
  const files = nodes.filter(node => fileShrub[node].isFile);

  return <>
    {directories.map(directory => (
      <TreeItem
        classes={{
          label: classes.labels,
        }}
        key={directory}
        nodeId={directory}
        onClick={() => expand(directory)}
        label={basename(directory)}
        style={{
          textOverflow: 'ellipsis',
        }}
      >
        {fileShrub[directory].branches && (
          <FileItem
            path={directory}
            fileShrub={fileShrub}
          />
        )}
      </TreeItem>
    ))}

    {files.map(file => (
      <TreeItem
        classes={{
          label: classes.labels,
        }}
        endIcon={<span/>}
        key={file}
        nodeId={file}
        onClick={() => expand(file)}
        label={basename(file)}
      />
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

const sortNames = (nameA: string, nameB: string): number => nameA.localeCompare(nameB);
