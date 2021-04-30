import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import FileContext from '../contexts/FileContext';
import { testImagePath } from '../lib/utils';
import ImageView from './ImageView';
import WindowItem from './WindowItem';

export default () => {
  const { fileShrub, path, selected, setSelected } = useContext(FileContext);
  const classes = useStyles();

  const isImage = testImagePath(selected || path);
  const nodes = fileShrub[selected || path]?.branches || [];

  return <div className={classes.container}>
    {isImage && (
      <ImageView
        path={path}
        selected={selected}
      />
    )}
    {nodes.map(node => (
      <WindowItem
        key={node}
        fileShrub={fileShrub}
        itemPath={node}
        onClick={setSelected}
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
