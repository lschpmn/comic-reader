import { useDispatch } from 'react-redux';
import { GET_DEFAULT_PATH, SET_PATH, SET_SELECTED } from '../../constants';
import socket from '../lib/socket';

export const useGetDefaultPathAction = () => {
  const dispatch = useDispatch();

  const listener = defaultPath => dispatch({
    payload: defaultPath,
    type: SET_PATH,
  });

  return () => socket.emit(GET_DEFAULT_PATH, listener);
};

export const useSetSelectedAction = () => {
  const dispatch = useDispatch();

  return (path: string) => dispatch({
    payload: path,
    type: SET_SELECTED,
  });
};
