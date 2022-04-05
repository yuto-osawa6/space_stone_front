import { SearchProductsData } from 'store/search/types';
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
//       // console.log(action)
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
      // console.log(action)
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
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        janls_id_in:state.janls_id_in.filter(data => data !== action.payload.id),
      }
    // default:
    //   return state;
    case ActionTypes.deletetodoGenresOne:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        janls_id_in:state.janls_id_in.filter(data => data !== action.payload.id),
      }

    case ActionTypes.deletetodoGenresAll:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
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

// export const searchProdcutsReducer = (state = initialState, action: SearchProductsActionTypes) => {
//   // const latestId = state.length;
//   switch (action.type) {
//     case ActionTypes.searchProductsTexts:
//       // state.push({
//         // id: action.payload.id,
//         // title: action.payload.title,
//       // });
//       // jsnls_id_in.push
//       // console.log("gggggg111111111111111111aaaaaaaaaa")

//       return  {
//         title_cont:action.payload.title_cont,
//         // janls_id_in:[""]
//         // janls_id_in:action.payload.janls_id_in
//       };
//     case ActionTypes.searchProductsStyles:
//     //   return state.filter(data => data.id !== action.payload.id);
//       return { title_cont: "" };

//     case ActionTypes.pussingGenresData:

//     return{
//       title_cont: ""
//     }

//     default:
//       // const _ : never = action;
//       // const _ : never = action;
//       const _ : never = action
//       // console.log("gggggg111111111111111111")

//       return state;
//   }
// };


// export const settiongtodoGenresReducer = (state = initialState, action:pussingtodoGenresData) => {
//   switch (action.type) {
//     case ActionTypes.todoGenres:
//       console.log(action)
//       state.janls_id_in.push(
//         action.payload.id
//         // id: action.payload.id,
//         // title: action.payload.title,
//       );
//       return state
//     default:
//       return state;
//   }
// };