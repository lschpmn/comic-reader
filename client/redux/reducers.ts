import { SET_PATH, SET_SELECTED, UPDATE_FILE_SHRUB } from '../../constants';
import { ReduxStore } from '../types';

const defaultState = {
  basePath: '',
  fileShrub: {},
  selectedPath: '',
};

export default function reducer(state: ReduxStore = defaultState, action: { payload: any, type: string }) {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        basePath: action.payload,
        selectedPath: '',
      };
    case SET_SELECTED:
      return {
        ...state,
        selectedPath: action.payload,
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
