import { SearchProductsData } from 'store/search/types';
import { ActionTypes } from '../actionTypes';
import {CastsData, CastsDataTypes} from './types';




const initialState:CastsData = {
  castids:{
  casts_id_in:[""],
  },
  cast:[]
}


export const SettingCastsReducer = (state=initialState, action:CastsDataTypes):CastsData => {
  switch (action.type) {
    case ActionTypes.Casts:
      // const leg = `${action.payload.id}`
      
      state.castids.casts_id_in.push(
        action.payload.id
      );
      state.cast.push(
        action.payload.cast
      );
      return {
        castids:{casts_id_in:state.castids.casts_id_in},
        cast:state.cast
      };
    case ActionTypes.DeleteCasts:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        castids:{casts_id_in:state.castids.casts_id_in.filter(data => data !== action.payload.id)},
        cast:state.cast.filter(data=>data != action.payload.cast)
      }
    // default:
    //   return state;
    case ActionTypes.DeleteCastsOne:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        castids:{casts_id_in:state.castids.casts_id_in.filter(data => data !== action.payload.id)},
        cast:state.cast.filter(data=>data != action.payload.cast)
      }

    case ActionTypes.DeleteCastsAll:
      // console.log(state.janls_id_in.filter(data => data !== action.payload.id))
      // state.janls_id_in.filter(data => data !== action.payload.id);
      return {
        // janls_id_in:[""]
        castids:{ casts_id_in:[""]},
        cast:[]

      }

    case ActionTypes.DeleteCastsExceptOne:
      state.castids.casts_id_in=[""]
      state.castids.casts_id_in.push(
        // {
        action.payload.id
        // id: action.payload.id,
        // title: action.payload.title,
      // }
      );
      state.cast=[]
      state.cast.push(
        action.payload.cast
      )
    return {
      // janls_id_in:[""]
      castids:{casts_id_in:state.castids.casts_id_in},
      cast:state.cast
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