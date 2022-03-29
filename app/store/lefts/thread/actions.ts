import { ActionTypes } from "store/actionTypes";
import { LeftThreadDataTypes } from "./types";

export const NavigatingLeftThreadDataAction = (item:number | null):LeftThreadDataTypes => {
  return {
    type: ActionTypes.NavigateLeftThreadData,
    payload: {
      selectSort:item
    },
  };
};

export const DeletingThreadDataAction = ():LeftThreadDataTypes => {
  return {
    type: ActionTypes.DeleteLeftThread,
    payload: {
    },
  };
};