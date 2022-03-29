import { SearchProductsData } from 'store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import { SortData, sortDataTypes} from './types';

// import {arrayGenres} from './types';



const initialState:SortData={
  s:"acsess_count desc"
  // s:""

}

export const sortReducer = (state=initialState, action:sortDataTypes) => {
  switch (action.type) {
    case ActionTypes.sort:
      
      return {
       s:action.payload.sort
       
      };
   
    default:
      // const _ : never = action
      return state;
  }
};

