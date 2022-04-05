import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';



export type OpenCloseManegementSubSearchData = {
  open:boolean
}

export interface OpenCloseManegementSubSearchType extends Action {
  type: typeof ActionTypes.OpenSubSearch;
  payload: { 
    open:boolean
  };
}



// export type SubSearchDataTypes = SubDeliveryEndGteQType | SubDeliveryStartGteQType | SubPickupSearchType |  SubPrivateSearchType | SubNewSearchType | SubAllDeleteType


