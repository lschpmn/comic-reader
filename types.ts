
export type FileTree = {
  isFile: boolean,
  fileTree?: { [file: string]: FileTree },
};
