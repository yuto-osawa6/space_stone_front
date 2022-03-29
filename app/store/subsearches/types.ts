import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';



export type SubSearchData = {
  delivery_end_gteq:Date | string
  delivery_start_gteq:Date | string
  pickup_true:boolean  | string
  finished:boolean | string
  new_content:boolean | string
  // new_content_true_or_delivery_start_gteq:[boolean,Date] | string
  todays:Date | string
  // open:boolean
}

export interface SubDeliveryEndGteQType extends Action {
  type: typeof ActionTypes.DeliveryEndGteq;
  payload: { 
    today:Date | string
  };
}

export interface SubDeliveryStartGteQType extends Action {
  type: typeof ActionTypes.DeliveryStartGteq;
  payload: { 
    today:Date | string
  };
}


export interface SubPickupSearchType extends Action {
  type: typeof ActionTypes.PickupSearch
  payload: { 
    true_false:boolean  | string
  };
}

export interface SubPrivateSearchType extends Action {
  type: typeof ActionTypes.PrivateSearch
  payload: { 
    today:Date | string
    true_false:boolean  | string
  };
}

export interface SubNewSearchType extends Action {
  type: typeof ActionTypes.NewSearch
  payload: { 
    today:Date | string
    true_false:boolean  | string
    today2:Date
  };
}

export interface SubAllDeleteType extends Action {
  type: typeof ActionTypes.AllDeleteSubClass
  payload: { 
   
  };
}



export type SubSearchDataTypes = SubDeliveryEndGteQType | SubDeliveryStartGteQType | SubPickupSearchType |  SubPrivateSearchType | SubNewSearchType | SubAllDeleteType


