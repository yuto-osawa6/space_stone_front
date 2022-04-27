import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import { GridData, GridDataTypes} from './types';

// import {arrayGenres} from './types';



const initialState:GridData={
  grid:""
}

export const GridReducer = (state=initialState, action:GridDataTypes) => {
  switch (action.type) {
    case ActionTypes.grid:
      
      return {
       grid:action.payload.grid
       
      };
   
    default:
      // const _ : never = action
      return state;
  }
};

