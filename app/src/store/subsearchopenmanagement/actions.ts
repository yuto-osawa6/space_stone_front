import { ActionTypes } from "@/store/actionTypes";
import { OpenCloseManegementSubSearchType } from "./types";


export const OpenCloseManagementSubSearchAction = (open:boolean): OpenCloseManegementSubSearchType => {
  // console.log(today)
  return {
    type: ActionTypes.OpenSubSearch,
    payload: {
      open:open
    },
  };
};
