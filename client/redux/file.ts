import { SET_PATH, SET_SELECTED, UPDATE_FILE_SHRUB } from '../../constants';
import { FileShrub } from '../../types';


const defaultState = {
  basePath: '',
  fileShrub: {},
  selected: '',
};

export function fileReducer(state: FileRedux = defaultState, action: { payload: any, type: string }) {
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

export type FileRedux = {
  basePath: string,
  fileShrub: FileShrub,
  selected: string,
};
