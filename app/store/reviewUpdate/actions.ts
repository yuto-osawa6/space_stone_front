import { ActionTypes } from '../actionTypes';
import { updateReviewDataTypes } from './types';



export const updateReviewAction = (update:boolean):updateReviewDataTypes => {
  return {
    type: ActionTypes.updateReviewState,
    payload: {
      update:update
    },
  };
};
