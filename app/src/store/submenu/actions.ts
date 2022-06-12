
import { ActionTypes } from '../actionTypes';
import {SubMenuState} from './types';



export const SubMenuAction = (s:boolean):SubMenuState => {
  return {
    type: ActionTypes.submenustate,
    payload: {
      state:s
    },
  };
};
