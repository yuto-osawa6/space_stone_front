import { Cast } from "@/interfaces/search";
import { Action } from "redux";
import { ActionTypes } from "@/store/actionTypes";


export type SubMenuData = {
  state:boolean
}


export interface SubMenuState extends Action {
  type: typeof ActionTypes.submenustate
  payload: { 
    state:boolean
  };
}