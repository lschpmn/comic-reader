import makeStyles from '@material-ui/core/styles/makeStyles';
import { dirname, join, extname, relative } from 'path';
import React, { useEffect, useMemo } from 'react';
import { IMAGE_TYPES } from '../../../constants';
import { FileShrub } from '../../../types';

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
  const relativePath = relative(path, selected);

  const [next, prev] = useNextPrevImgDir(fileShrub, selected);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (nextButtons.includes(e.key) && next) setSelected(next);
      if (previousButtons.includes(e.key) && prev) setSelected(prev);
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [next, prev, setSelected]);

  return <div className={classes.container}>
    <div
      className={classes.clickOverlay}
      onClick={() => prev && setSelected(prev)}
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

const useNextPrevImgDir = (fileShrub: FileShrub, selected: string) => {
  return useMemo(() => {
    const directory = dirname(selected);
    const imgIndex = fileShrub[directory]?.branches?.findIndex(branch => branch === selected);
    let next = fileShrub[directory]?.branches?.[imgIndex + 1];
    let prev = fileShrub[directory]?.branches?.[imgIndex - 1];

    const parent = join(directory, '..');
    const dirIndex = fileShrub[parent]?.branches?.findIndex(branch => branch === directory);

    if (!next) {
      const dirNext = fileShrub[parent]?.branches?.[dirIndex + 1];
      const nextImg = fileShrub[dirNext]?.branches?.[0] || '';
      next = IMAGE_TYPES.includes(extname(nextImg)) && nextImg;
    }

    if (!prev) {
      const dirPrev = fileShrub[parent]?.branches?.[dirIndex - 1];
      const prevImage = fileShrub[dirPrev]?.branches?.slice(-1)?.[0] || '';
      prev = IMAGE_TYPES.includes(extname(prevImage)) && prevImage;
    }

    return [next, prev];
  }, [fileShrub, selected]);
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
