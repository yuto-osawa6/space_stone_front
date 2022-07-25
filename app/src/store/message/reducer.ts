import { ActionTypes } from '../actionTypes';
import { MessageData, MessageDataTypes } from './types';

const initialState:MessageData = {
  message:[]
}

export const topMessageReducer = (state=initialState, action:MessageDataTypes):MessageData => {
  switch (action.type) {
    case ActionTypes.pusshingMessage:
      if(state.message.length>5){
        return state
      }
      // state.message.push(action.payload.message)
      const array = [...state.message,action.payload.message]
      return {
        message:array
        // message:state.message
      };
    case ActionTypes.deleteingMessage:
      const [,...arr2] = state.message;
      return {
        message:arr2
      }
    case ActionTypes.selectDeleteMessage:
      return {
        message:state.message
      }    
    default:
      const _ : never = action
      return state;
  }
};
