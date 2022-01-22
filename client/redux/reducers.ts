import { combineReducers } from 'redux';
import { SET_PATH, SET_SELECTED, UPDATE_FILE_SHRUB } from '../../constants';
import { FileRedux } from '../types';

const defaultFileState = {
  basePath: '',
  fileShrub: {},
  selected: '',
};

export const combinedReducers = combineReducers({
  file: fileReducer,
});

export function fileReducer(state: FileRedux = defaultFileState, action: { payload: any, type: string }) {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        basePath: action.payload,
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case UPDATE_FILE_SHRUB:
      return {
        ...state,
        fileShrub: {
          ...state.fileShrub,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
