import { product } from 'interfaces/product';
import { ActionTypes } from '../actionTypes';
import { SetProductData,SettiongGenresData, SettiongProductDataTypes  } from './types';
export interface set  {
  id:number
  name:string

}


// export const actionSettingProductData = (product: SetProductData):SettiongGenresData => {

//   return {
//     type: ActionTypes.product,
//    product:product
//   };
// };

export const actionSettingProductData = (product: product):SettiongProductDataTypes => {

  return {
    type: ActionTypes.product,
   product:product
  };
};

export const actionSettingProductData2 = (product: product):SettiongProductDataTypes  => {

  return {
    type: ActionTypes.productshow,
    product:product
  };
};
