import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import FileContext from '../contexts/FileContext';
import { testImagePath } from '../lib/utils';
import ImageView from './ImageView';
import WindowItem from './WindowItem';

export default () => {
  const { changePath, fileShrub, path } = useContext(FileContext);
  const classes = useStyles();

  const isImage = testImagePath(path);
  const nodes = fileShrub[path]?.branches || [];

  return <div className={classes.container}>
    {isImage && (
      <ImageView
        path={path}
      />
    )}
    {nodes.map(node => (
      <WindowItem
        key={node}
        changePath={changePath}
        fileShrub={fileShrub}
        itemPath={node}
        path={path}
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
