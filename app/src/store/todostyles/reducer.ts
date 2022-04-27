import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import { todoStylesDataTypes, todoStylesData} from './types';

// import {arrayGenres} from './types';



const initialState:todoStylesData={
  styles_id_eq:"",
}

export const settiongtodoStylesReducer = (state=initialState, action:todoStylesDataTypes) => {
  switch (action.type) {
    case ActionTypes.todoStyles:
      state.styles_id_eq = action.payload.id
      return {
        styles_id_eq:action.payload.id
      };
    case ActionTypes.deletetodoStylesAll:

    return {
      styles_id_eq:""
    };
   
    default:
      const _ : never = action
      return state;
  }
};

