import { FileShrub } from '../types';

export type FileRedux = {
  basePath: string,
  fileShrub: FileShrub,
  selected: string,
};

export type ReduxStore = {
  file: FileRedux,
};
