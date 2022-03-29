import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import {SettiongGenresData, SGD } from './types';


const initialState:SGD = {
  // isLoggedin: false,
  // isLoading: false,
  genres: [
    {
      id:0,
      name:""
    }
  ],
  loaded:false
};


export const settiongGenresReducer = (state = initialState, action:SettiongGenresData):SGD => {
  // const latestId = state.length;
  switch (action.type) {
    case ActionTypes.setGenres:
      console.log(action)
      return {
          genres:action.genres,
          loaded:true   
        }
     
      // return state;
      // return  {title_cont:action.payload.title_cont};
    // case ActionTypes.setFFF:
    // //   state.push({
    // //     id: action.payload.id,
    // //     name: action.payload.name,
    // //   });
    // return {
    //   genres:action.genres
    //   // {
       
    //   // }
        
    // }
    //   return state.filter(data => data.id !== action.payload.id);
      // return state;

    default:
      // const _ : never = action;
      // const _ : never = action;
      // const _ : never = action

      return state;
  }
};