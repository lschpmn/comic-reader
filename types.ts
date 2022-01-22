
export type Action = {
  payload: any,
  type: string,
};

// instead of a branching tree, it's a flat shrub
export type FileShrub = {
  [nodePath: string]: {
    isFile: boolean,
    branches?: string[],
  },
};
