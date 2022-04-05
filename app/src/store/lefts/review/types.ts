import { Action } from "redux";
import { ActionTypes } from "store/actionTypes";

export interface NavigateLeftReviewData extends Action {
  type: typeof ActionTypes.NavigateLeftReviewData;
  payload: { 
    selectSort:number | null
  };
}

export interface DeletingLeftReviewData extends Action {
  type: typeof ActionTypes.DeleteLeftReview;
  payload: { 
  };
}

export type LeftReviewDataTypes = NavigateLeftReviewData| DeletingLeftReviewData
