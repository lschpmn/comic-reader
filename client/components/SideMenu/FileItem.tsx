import makeStyles from '@material-ui/core/styles/makeStyles';
import TreeItem from '@material-ui/lab/TreeItem';
import { basename } from 'path';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useReadDirAction, useSetSelectedAction } from '../../redux/actions';
import { ReduxStore } from '../../types';

type Props = {
  path: string,
};

export default function FileItem({ path }: Props){
  const readDirAction = useReadDirAction();
  const setSelectedAction = useSetSelectedAction();
  const branches = useSelector((store: ReduxStore) => store.fileShrub[path].branches, shallowEqual) || [];
  const node = useSelector((store: ReduxStore) => store.fileShrub[path], shallowEqual);
  const classes = useStyles();

  return <>
    {!node.isFile && branches.map(node => (
      <TreeItem
        classes={{
          label: classes.labels,
        }}
        endIcon={<span/>}
        key={node}
        nodeId={node}
        onIconClick={() => readDirAction(node)}
        onLabelClick={(e) => {
          e.preventDefault();
          setSelectedAction(node);
        }}
        label={basename(node)}
      >
        <FileItem
          path={node}
        />
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
