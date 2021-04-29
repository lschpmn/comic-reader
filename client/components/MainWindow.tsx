import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import FileContext from '../contexts/FileContext';
import WindowItem from './WindowItem';

export default () => {
  const { fileShrub, path } = useContext(FileContext);
  const classes = useStyles();

  const nodes = fileShrub[path]?.branches || [];

  return <div className={classes.container}>
    {nodes.map(node => (
      <WindowItem
        key={node}
        itemPath={node}
      />
    ))}
  </div>;
};

const useStyles = makeStyles({
  container: {
    alignContent: 'start',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: '100%',
  },
});
