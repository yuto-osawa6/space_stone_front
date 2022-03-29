import { ActionTypes } from "store/actionTypes";
import { SubSearchDataTypes } from "./types";


export const DeilyEndQteQAction = (today:Date): SubSearchDataTypes => {
  // console.log(today)
  return {
    type: ActionTypes.DeliveryEndGteq,
    payload: {
      today:today
    },
  };
};

export const DeilyStartQteQAction = (today:Date): SubSearchDataTypes => {
  return {
    type: ActionTypes.DeliveryStartGteq,
    payload: {
      today:today
    },
  };
};

export const SubPickupSearchAction = (true_false:boolean): SubSearchDataTypes => {
  return {
    type: ActionTypes.PickupSearch,
    payload: {
      true_false:true_false
    },
  };
};

export const SubPrivateSearchAction = (today:Date,true_false:boolean): SubSearchDataTypes => {
  return {
    type: ActionTypes.PrivateSearch,
    payload: {
      today:today,
      true_false:true_false
    },
  };
};

export const SubNewSearchAction = (today:Date,true_false:boolean): SubSearchDataTypes => {
  return {
    type: ActionTypes.NewSearch,
    payload: {
      today:today,
      today2:today,
      true_false:true_false
    },
  };
};

export const AllDeleteSubClassAction = (): SubSearchDataTypes => {
  return {
    type: ActionTypes.AllDeleteSubClass,
    payload: {
     
    },
  };
};
