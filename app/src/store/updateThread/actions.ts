import { ActionTypes } from '../actionTypes';
import { updateThreadDataTypes } from './types';



export const updateThreadAction = (update:boolean):updateThreadDataTypes => {
  return {
    type: ActionTypes.updateThreadState,
    payload: {
      update:update
    },
  };
};
