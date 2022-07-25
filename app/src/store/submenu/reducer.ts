import { ActionTypes } from '../actionTypes';
import {SubMenuData,SubMenuState} from './types';


const initialState:SubMenuData = {
 state:false
};


export const subMenuReducer = (state = initialState, action:SubMenuState):SubMenuData => {

  switch (action.type) {
    case ActionTypes.submenustate:
      return {
          state:action.payload.state
        }
    default:
      return state;
  }
};