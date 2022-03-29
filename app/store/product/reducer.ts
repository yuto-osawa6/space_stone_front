import { product } from 'interfaces/product';
import { ActionTypes } from '../actionTypes';
// import { SearchProductsActionTypes, SPD } from './types';
import {IniProductData, SetProductData ,SettiongGenresData, SettiongProductDataTypes} from './types';


const initialState:SetProductData = {
  id: 0,
  title: "",
  imageUrl: "",
  arasuzi:",",
  productGenres:[{
    id:0,
    name:""
  }],
  productStyles:[{
    id:0,
    name:""
  }]
};


export const settiongProductReducer = (state = IniProductData, action:SettiongProductDataTypes):product => {
  // const latestId = state.length;
  switch (action.type) {
    case ActionTypes.product:
      // console.log(action)
      // state.productGenres.push(action.product.productGenres.id)
      return state
      // {    
      //     id:action.product.id,
      //     title:action.product.title,
      //     imageUrl:action.product.imageUrl, 
      //     arasuzi:action.product.arasuzi,
      //     productGenres:action.product.productGenres,
      //     productStyles:action.product.productStyles
      //   }
    case ActionTypes.productshow:
      // console.log(action)
      // state.productGenres.push(action.product.productGenres.id)
      return action.product
      // {
      //     // id:action.product.id,
      //     // title:action.product.title,
      //     // imageUrl:action.product.imageUrl, 
      //     // arasuzi:action.product.arasuzi,
      //     // productGenres:action.product.productGenres,
      //     // productStyles:action.product.productStyles
      //   }
    default:
      const _ : never = action
      return state;
  }
};