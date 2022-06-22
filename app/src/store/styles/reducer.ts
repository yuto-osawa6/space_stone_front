import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import {SettiongStylesData, STDR } from './types';


const initialState:STDR = {
  styles: [
    {
      id:0,
      name:""
    }
  ]
};


export const settiongStylesReducer = (state = initialState, action:SettiongStylesData):STDR => {

  switch (action.type) {
    case ActionTypes.setStyles:
      return {
          // genres:action.genres
          styles:action.styles   
        }
    default:
      return state;
  }
};