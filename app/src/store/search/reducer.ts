// import { ActionTypes } from '../actionTypes';
// // import { SearchProductsActionTypes, SPD } from './types';
// import { SearchProductsActionTypes, SearchProductsData } from './types';



// // const initialState: SPD = [];
// const initialState:SearchProductsData = {
//   title:""
// }


// export const searchProdcutsReducer = (state = initialState, action: SearchProductsActionTypes) => {
//   // const latestId = state.length;
//   switch (action.type) {
//     case ActionTypes.searchProductsTexts:
//       // state.push({
//         // id: action.payload.id,
//         // title: action.payload.title,
//       // });
     
//       return state;
//     case ActionTypes.searchProductsStyles:
//     //   return state.filter(data => data.id !== action.payload.id);
//       return { id: 0 };
//     default:
//       // const _ : never = action;
//       // const _ : never = action;
//       const _ : never = action

//       return state;
//   }
// };




import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import { SearchProductsActionTypes, SearchProductsData } from './types';



// const initialState: SPD = [];
const initialState:SearchProductsData = {
  title_cont:"",
  // janls_id_in:[""]
}


export const searchProdcutsReducer = (state = initialState, action: SearchProductsActionTypes) => {
  // const latestId = state.length;
  switch (action.type) {
    case ActionTypes.searchProductsTexts:
      // state.push({
        // id: action.payload.id,
        // title: action.payload.title,
      // });
      // jsnls_id_in.push
      // console.log("gggggg111111111111111111aaaaaaaaaa")

      return  {
        title_cont:action.payload.title_cont,
        // janls_id_in:[""]
        // janls_id_in:action.payload.janls_id_in
      };
    // case ActionTypes.searchProductsStyles:
    // //   return state.filter(data => data.id !== action.payload.id);
    //   return { title_cont: "" };

    // case ActionTypes.pussingGenresData:

    // return{
    //   title_cont: ""
    // }
    case ActionTypes.searchClearTitle:
    return {
      title_cont:""
    }

    default:
      // const _ : never = action;
      // const _ : never = action;
      const _ : never = action
      // console.log("gggggg111111111111111111")

      return state;
  }
};