import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
import { UpdateData,updateReviewDataTypes } from './types';



const initialState:UpdateData={
  update:false
}

export const updateReviewReducer = (state=initialState, action:updateReviewDataTypes) => {
  switch (action.type) {
    case ActionTypes.updateReviewState:
      return {
       update:action.payload.update
      };
    default:
      return state;
  }
};

