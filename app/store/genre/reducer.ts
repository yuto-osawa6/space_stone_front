import { ActionTypes } from '../actionTypes';
import { SetGenresData2, SettiongGenresData2 } from './types';
// import { SearchProductsActionTypes, SPD } from './types';
// import { SettingGenresDatetypes2, SetGenresData2, SettiongGenresData2 } from './types';



interface SGG {
  genres: [
    {
      id:number
      name:string
    }
  ]
}

const initialState:SetGenresData2 = {
  // isLoggedin: false,
  // isLoading: false,
  genres: [
    {
      id:0,
      name:""
    }
  ]
  
  
};

export const settiongGenresReducer2 = (state = initialState, action:SettiongGenresData2):SetGenresData2 => {
  // const latestId = state.length;
  switch (action.type) {
    case ActionTypes.setGenre:
      // console.log(action)

      return {
          genres:action.genres
          // genres:{
          //   id:action.genres
          //   name:action.genres
          // }
      }
      default:
        return state
    // case ActionTypes.setCCC:
    // //   state.push({
    // //     id: action.payload.id,
    // //     name: action.payload.name,
    // //   });
    // return {
    //   genres:action.genres
    //   // {
       
    //   // }
        
    // }
    // //   return state.filter(data => data.id !== action.payload.id);
    //   // return state;

    // default:
    //   // const _ : never = action;
    //   // const _ : never = action;
    //   const _ : never = action

    //   return state;
  }
};


// export const settiongGenresReducer2 = (state = initialState, action:SettingGenresDatetypes2):SetGenresData2 => {
//   // const latestId = state.length;
//   switch (action.type) {
//     case ActionTypes.setGenre:
//       // console.log(action)

//       return {
//           genres:action.genres
//           // genres:{
//           //   id:action.genres
//           //   name:action.genres
//           // }
//       }
//     case ActionTypes.setCCC:
//     //   state.push({
//     //     id: action.payload.id,
//     //     name: action.payload.name,
//     //   });
//     return {
//       genres:action.genres
//       // {
       
//       // }
        
//     }
//     //   return state.filter(data => data.id !== action.payload.id);
//       // return state;

//     default:
//       // const _ : never = action;
//       // const _ : never = action;
//       const _ : never = action

//       return state;
//   }
// };