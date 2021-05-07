import makeStyles from '@material-ui/core/styles/makeStyles';
import { dirname, relative } from 'path';
import React, { useEffect } from 'react';
import { FileShrub } from '../../types';

const port: number = (window as any).__PORT__;

type Props = {
  fileShrub: FileShrub,
  path: string,
  selected: string,
  setSelected: (path: string) => void,
};

const nextButtons = ['ArrowDown', 'ArrowRight', ' ', 'Enter'];
const previousButtons = ['ArrowUp', 'ArrowLeft', 'Backspace'];

export default ({ fileShrub, path, selected, setSelected }: Props) => {
  const classes = useStyles();
  const directory = dirname(selected);
  const index = fileShrub[directory]?.branches?.findIndex(branch => branch === selected);
  const next = fileShrub[directory]?.branches[index + 1];
  const previous = fileShrub[directory]?.branches[index - 1];
  const relativePath = relative(path, selected);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (nextButtons.includes(e.key) && next) setSelected(next);
      if (previousButtons.includes(e.key) && previous) setSelected(previous);
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [next, previous, setSelected]);

  return <div className={classes.container}>
    <div
      className={classes.clickOverlay}
      onClick={() => previous && setSelected(previous)}
    />
    <div
      className={classes.clickOverlay}
      onClick={() => next && setSelected(next)}
      style={{ right: 0 }}
    />
    <img
      className={classes.image}
      src={`http://localhost:${port}/static/${relativePath}`}
    />
  </div>;
};

const useStyles = makeStyles({
  clickOverlay: {
    position: 'absolute',
    height: '100%',
    width: '50%',
  },
  container: {
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
});
