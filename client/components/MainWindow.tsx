import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext, useEffect, useRef } from 'react';
import FileContext from '../contexts/FileContext';
import { testImagePath } from '../lib/utils';
import ImageView from './ImageView';
import WindowItem from './WindowItem';

export default () => {
  const { fileShrub, path, selected, setSelected } = useContext(FileContext);
  const classes = useStyles();
  const main = useRef(null);

  const isImage = testImagePath(selected);
  const nodes = fileShrub[selected || path]?.branches || [];

  useEffect(() => main?.current?.scrollTo(0, 0), [selected, path]);

  return <div className={classes.container} ref={main}>
    {isImage && (
      <ImageView
        fileShrub={fileShrub}
        path={path}
        selected={selected}
        setSelected={setSelected}
      />
    )}
    {nodes.map(node => (
      <WindowItem
        key={node}
        fileShrub={fileShrub}
        itemPath={node}
        setSelected={setSelected}
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
