import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_DEFAULT_PATH, READ_DIR, SET_PATH, SET_SELECTED, UPDATE_FILE_SHRUB } from '../../constants';
import socket from '../lib/socket';
import { openPathDialog } from '../lib/utils';
import { ReduxStore } from '../types';

export const useChangeDirAction = () => {
  const dispatch = useDispatch();
  const selectedPath = useSelector((state: ReduxStore) => state.selectedPath);

  return useCallback(async () => {
    const dialogRes: Electron.OpenDialogReturnValue = await openPathDialog(selectedPath);
    const newPath = dialogRes.filePaths[0];
    if (!newPath) return;
    socket.emit(SET_PATH, newPath, () => dispatch({
      payload: newPath,
      type: SET_PATH,
    }));
    return newPath;
  }, [dispatch, selectedPath]);
};

export const useGetDefaultPathAction = () => {
  const dispatch = useDispatch();

  return useCallback(() =>
      socket.emit(GET_DEFAULT_PATH, defaultPath => dispatch({
        payload: defaultPath,
        type: SET_PATH,
      })),
    [dispatch]);
};

export const useReadDirAction = () => {
  const dispatch = useDispatch();

  return useCallback((path: string) => {
      socket.emit(READ_DIR, path, fileShrub => dispatch({
        payload: fileShrub,
        type: UPDATE_FILE_SHRUB,
      }));
    },
    [dispatch]);
};

export const useSetSelectedAction = () => {
  const dispatch = useDispatch();

  return useCallback((path: string) => dispatch({
    payload: path,
    type: SET_SELECTED,
  }), [dispatch]);
};
