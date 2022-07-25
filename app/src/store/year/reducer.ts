import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import { SubSearchYearData, SubSearchYearDataTypes } from './types';


const initialState:SubSearchYearData = {
  // year2_gteq: "",
  // year2_lteq: ""
  years:{
  year_season_years_year_gteq:"",
  year_season_years_year_lteq:""
  },
  checked:true
};


export const YearSearchReducer = (state = initialState, action:SubSearchYearDataTypes):SubSearchYearData => {
  // const latestId = state.length;
  switch (action.type) {
    case ActionTypes.YearSearch:
      return {
        // year2_gteq: action.payload.year2_gteq,
        //  year2_lteq: action.payload.year2_lteq
        years:{
        year_season_years_year_gteq:action.payload.year2_gteq,
        year_season_years_year_lteq:action.payload.year2_lteq
        },
        checked:false
        }
    case ActionTypes.YearSearchDestroy:
      return {
          // year2_gteq: "",
          // year2_lteq: ""
          years:{
          year_season_years_year_gteq:"",
          year_season_years_year_lteq:""
          },
          checked:true
        }
    

    default:
      const _ : never = action;
      return state;
  }
};