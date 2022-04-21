import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
import { UpdateThreadData, updateThreadDataTypes } from './types';



const initialState:UpdateThreadData={
  update:false
}

export const updateThreadReducer = (state=initialState, action:updateThreadDataTypes) => {
  switch (action.type) {
    case ActionTypes.updateThreadState:
      return {
       update:action.payload.update
      };
    default:
      return state;
  }
};

