import { SearchProductsData } from '@/store/search/types';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import {todoGenresData, pussingtodoGenresData, todoGenresDataTypes} from './types';

// import {arrayGenres} from './types';



const initialState:todoGenresData={
  janls_id_in:[""],
  // janls_id_change:"aaaa"
}

// const stat:SearchProductsData={
//   title_cont:""
// };
// const initialState:tgd = [];



// export const settiongtodoGenresReducer = (state=initialState, action:pussingtodoGenresData) => {
// export const settiongtodoGenresReducer = (state=initialState, action:pussingtodoGenresData) => {
//   switch (action.type) {
//     case ActionTypes.todoGenres:
//       const leg = `${action.payload.id}`
//       state.janls_id_in.push(
//         // {
//         action.payload.id
//         // id: action.payload.id,
//         // title: action.payload.title,
//       // }
//       );
//       state.janls_id_change += leg
//       return state;

//     default:
//       return state;
//   }
// };


export const settiongtodoGenresReducer = (state=initialState, action:todoGenresDataTypes) => {
  switch (action.type) {
    case ActionTypes.todoGenres:
      const leg = `${action.payload.id}`
      state.janls_id_in.push(
        // {
        action.payload.id
        // id: action.payload.id,
        // title: action.payload.title,
      // }
      );
      // state.janls_id_change += leg
      return {
        janls_id_in:state.janls_id_in,
        // janls_id_change:state.janls_id_change

      };
    case ActionTypes.deletetodoGenres:
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        janls_id_in:state.janls_id_in.filter(data => data !== action.payload.id),
      }
    // default:
    //   return state;
    case ActionTypes.deletetodoGenresOne:
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        janls_id_in:state.janls_id_in.filter(data => data !== action.payload.id),
      }

    case ActionTypes.deletetodoGenresAll:
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        // janls_id_in:[""]
        janls_id_in:[""]

      }

    case ActionTypes.deletetodoGenresExceptOne:
      state.janls_id_in=[""]
      state.janls_id_in.push(
        // {
        action.payload.id
        // id: action.payload.id,
        // title: action.payload.title,
      // }
      );
    return {
      // janls_id_in:[""]
      janls_id_in:state.janls_id_in

    }
    // default:
    //   return state;
    default:
      const _ : never = action
      return state;
  }
};
