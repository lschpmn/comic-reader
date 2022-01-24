import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { testImagePath, useFileShrubForPath } from '../../lib/utils';
import { useReadDirAction } from '../../redux/actions';
import { ReduxStore } from '../../types';
import ImageView from './ImageView';
import WindowItem from './WindowItem';

export default () => {
  const readDirAction = useReadDirAction();
  const basePath = useSelector((store: ReduxStore) => store.basePath);
  const selectedPath = useSelector((store: ReduxStore) => store.selectedPath);
  const path = selectedPath || basePath;
  const branches = useSelector((store: ReduxStore) => store.fileShrub[path]?.branches) || [];
  const fileShrub = useFileShrubForPath(path);
  const [loading, setLoading] = useState('');
  const classes = useStyles();
  const main = useRef(null);

  const isImage = testImagePath(selectedPath);

  useEffect(() => main?.current?.scrollTo(0, 0), [selectedPath]);
  useEffect(() => !isImage && !branches.length && !!path && readDirAction(path), [branches]);

  useEffect(() => {
    const notLoaded = branches.find(branch => fileShrub[branch].branches === undefined);
    if (!!notLoaded && notLoaded !== loading) {
      setLoading(notLoaded);
      readDirAction(notLoaded);
    }
  }, [branches, fileShrub]);

  return <div className={classes.container} ref={main}>
    {isImage && (
      <ImageView
        selectedPath={selectedPath}
      />
    )}
    {branches.map(node => (
      <WindowItem
        key={node}
        itemPath={node}
      />
    ))}
  </div>;
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'auto',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: '100%',
  },
});
