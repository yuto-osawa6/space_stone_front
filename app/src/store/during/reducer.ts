import { ActionTypes } from '../actionTypes';
import { SubSearchTimeData, SubSearchTimeDataTypes } from './types';



const initialState:SubSearchTimeData = {
  times:{
  time_gteq: "",
  time_lteq: ""
  },
  time_range:[0,240]
};


export const TimeSearchReducer = (state = initialState, action:SubSearchTimeDataTypes):SubSearchTimeData => {
  switch (action.type) {
    case ActionTypes.DuringSearch:
      console.log(action)
      return {
        times:{
        time_gteq: action.payload.time_gteq,
        time_lteq: action.payload.time_lteq
        },
        time_range: action.payload.time_range
        }
    case ActionTypes.DuringSearchDestroy:
      console.log(action)
      return {
        times:{
        time_gteq: "",
        time_lteq: ""
        },
        time_range:[0,240]

        }
    

    default:
      const _ : never = action;
      return state;
  }
};