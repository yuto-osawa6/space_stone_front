import { ActionTypes } from "@/store/actionTypes";
import { LeftReviewDataTypes } from "./types";

export const NavigatingLeftReviewDataAction = (item:number | null):LeftReviewDataTypes => {
  return {
    type: ActionTypes.NavigateLeftReviewData,
    payload: {
      selectSort:item
    },
  };
};

export const DeletingReviewDataAction = ():LeftReviewDataTypes => {
  return {
    type: ActionTypes.DeleteLeftReview,
    payload: {
    },
  };
};