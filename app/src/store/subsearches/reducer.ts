
import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import {SubSearchData, SubSearchDataTypes} from './types';

// import {arrayGenres} from './types';



const initialState:SubSearchData={
  delivery_end_gteq:"",
  delivery_start_gteq:"",
  pickup_true:"",
  finished:"",
  new_content:"",
  todays:""
  // new_content_true_or_delivery_start_gteq:""

}


export const SettiongSubSearchesReducer = (state=initialState, action:SubSearchDataTypes):SubSearchData => {
  switch (action.type) {
    case ActionTypes.DeliveryEndGteq:
    console.log(action.payload.today)
      return {
        delivery_end_gteq:action.payload.today,
        delivery_start_gteq:"",
        pickup_true:"",
        finished:"",
        new_content:"",

        todays:""
        // new_content_true_or_delivery_start_gteq:""
      };

    case ActionTypes.DeliveryStartGteq:

    return {
      delivery_end_gteq:"",
      delivery_start_gteq:action.payload.today,
      pickup_true:"",
      finished:"",
      new_content:"",

      todays:""
      // new_content_true_or_delivery_start_gteq:""
    };

    case ActionTypes.PickupSearch:

      return {
        delivery_end_gteq:"",
        delivery_start_gteq:"",
        pickup_true:action.payload.true_false,
        finished:"",
        new_content:"",

        todays:""
        // new_content_true_or_delivery_start_gteq:""
      };

    case ActionTypes.PrivateSearch:

    return {
      delivery_end_gteq:"",
      delivery_start_gteq:action.payload.today,
      pickup_true:"",
      finished:action.payload.true_false,
      new_content:"",

      todays:""
      // new_content_true_or_delivery_start_gteq:""
    };

    case ActionTypes.NewSearch:

    return {
      delivery_end_gteq:"",
      delivery_start_gteq:"",
      // delivery_start_gteq:"",

      pickup_true:"",
      finished:"",
      new_content:action.payload.true_false,
      // new_content_true:"",

      todays:action.payload.today
      // new_content_true_or_delivery_start_gteq:[true,action.payload.today2]
    };
    case ActionTypes.AllDeleteSubClass:

    return {
      delivery_end_gteq:"",
      delivery_start_gteq:"",
      pickup_true:"",
      finished:"",
      new_content:"",
      todays:""
    };
    
    default:
      const _ : never = action
      return state;
  }
};

