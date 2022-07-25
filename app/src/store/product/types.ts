import { product } from '@/interfaces/product';
import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

export type SetProductData = {
  id: number
  title: string
  imageUrl: string
  arasuzi:string
  productGenres:[{
    id:number
    name:string
  }]
  productStyles:[{
    id:number
    name:string
  }]

}

export const IniProductData:product = {
  id: 0,
  title: "",
  imageUrl: "",
  arasuzi:"",
  imageUrl2: undefined,
  imageUrl3: undefined,
  imageUrlh1: undefined,
  imageUrlh2: undefined,
  imageUrlh3: undefined,
  copyright:"",
  arasuziCopyright:"",
  annict:0,
  shoboi:0,
  // 
  averageScore:"",
  likeCount:0,
  productGenres:[{
    id:0,
    name:""
  }],
  productStyles:[{
    id:0,
    name:""
  }],
  productReviews:[{
    id:0,
    content:"",
    discribe:""
  }],
  productThereds:[{
    id:0,
    title:"",
    content:"",
    discribe:"",
  }],
  questions:[{
    id:0,
    question:""
  }],
  deliveryEnd:"",
  deliveryStart:"",

  year:"",
  duration:"",
  list:"",
  
  rank:0,
  averageScoreCount:0,
  endJudge:"",

  episords:[{
    arasuzi: "",
    episord: 0,
    id: 0,
    image: "",
    // productId:number
    season: 0,
    seasonTitle: "",
    time: undefined,
    title: "",
    releaseDate:"",
  }],
  yourScore:0,
  tags:[{
    id:0,
    tag:"",
    rank:0,
    genre:0,
  }],
  scores:[{
    id:0,
    value:0,
    updatedAt:undefined
  }],
  // season:"",
  pickup:false,
  finished:false,
  likes:[{
    id:0,
    updatedAt:undefined
  }],
  acsesses:[{
    id:0,
    count:0,
    updatedAt:undefined
  }],
  reviews:[{
    id:0,
    updatedAt:undefined
  }],
  productEpisord:{
    arasuzi: "",
    episord: 0,
    image: "",
    releaseDate:undefined
  },
  productStudio:[{
    id:0,
    company:""
  }],
  productCharacter:[{
    castName:{
      id: 0,
      name: "",
    },
    id: 0,
    name: "",
  }],
  productStaff:[{
    staffName:{
      id: 0,
      name: ""
    },
    id: 0,
    name: ""
  }],
  productKisetsu:[{
    id:0,
    name:""
  }],
  productYearSeason:[{
    year:"",
    season:[{
      id:"",
      name:""
    }]
  }],
  userReviews:[{
    id: 0,
    content: "",
    episordId: null,
    emotions:[{
      id: 0,
      emotion: ""
    }],
    score:0
   
    // productId: 0,
    // userId: 1
  }],
  emotions:[{
    id: 0, 
    emotion: ''
}],
emotionList: [{
  id: 9, 
  emotion:"",
  // length:[{
  //   id:0,
  //   productId:0
  // }]
  length:0
}],
overview:"",
productWeekly:[{
    id:0,
    count:0,
    weekly:undefined
  }],
  avg:"",
  tier:"",
  productYearSeason2:[{
    id:0,
    year:{
      id:0,
      year:""
    },
    season:{
      id:0,
      name:""
    },
  }],
  like2:0
}


export interface SettiongGenresData extends Action {
  type: typeof ActionTypes.product
  product:product
  // loaded:boolean
}

export interface SettiongProductData extends Action {
  type: typeof ActionTypes.productshow
  product:product
  // loaded:boolean
}

export type SettiongProductDataTypes = SettiongGenresData  | SettiongProductData



