// export interface productGenres{
//   id:number
//   name:string
// }
// export interface productStyles{
//   id:number
//   name:string
// }


export interface product {

  id: number
  title: string
  imageUrl: string
  imageUrl2:string | undefined
  imageUrl3:string | undefined
  imageUrlh1:string | undefined
  imageUrlh2:string | undefined
  imageUrlh3:string | undefined

  arasuzi:string
  // 
  averageScore:string
  likeCount:number
  productGenres:[{
    id:number
    name:string
  }]
  productStyles:[{
    id:number
    name:string
  }]
  productReviews:[{
    id:number
    content:string
    discribe:string
  }]
  productThereds:[{
    id:number
    title:string
    content:string
    discribe:string
  }]
  questions:[{
    id:number
    question:string
  }]
  deliveryEnd:string
  deliveryStart:string

  year:string
  duration:string
  list:string
  
  rank:number
  averageScoreCount:number
  endJudge:string
  // averagescore:string

  episords:[{
    arasuzi: string
    episord: number
    id: number | null
    image: string
    // productId:number
    season: number
    seasonTitle: string
    time: Date | undefined
    title: string
    releaseDate:string
  }]
  productEpisord:{
    arasuzi: string
    episord: number
    image: string
    releaseDate: Date | undefined
  }
  yourScore:number
  tags:[{
    id:number
    tag:string
    rank:number
    genre:number
  }]
  scores:[{
    id:number
    value:number
    updatedAt:number|undefined
  }]
  // season:string
  pickup:boolean
  finished:boolean
  likes:[{
    id:number
    updatedAt:number|undefined

  }]
  acsesses:[{
    id:number
    count:number
    updatedAt:number|undefined
  }]
  reviews:[{
    id:number
    updatedAt:number|undefined
  }]

  productStudio:[{
    id:number
    company:string
  }]
  productCharacter:[{
    castName:{
      id: number
      name: string
    }
    id: number
    name: string
  }]
  productStaff:[{
    staffName:{
      id: number
      name: string
    }
    id: number
    name: string
  }]
  productKisetsu:[{
    id:number
    name:string
  }]

  productYearSeason:[{
    year:string
    season:[{
      id:string
      name:string
    }]
  }]

  userReviews:[{
    id: number
    content: string
    episordId: number | null
    // productId: 3
    // userId: 1
    emotions:[{
      id: number
      emotion: string
    }]
  }]
  emotions:[{
    id:number
    emotion:string
  }]
 
  emotionList:[{
    id: number 
    emotion:string
    length:number
  }]
  overview:string
  productWeekly:[{
    id:number
    count:number 
    weekly:Date | undefined
  }]
  avg:string
  tier:string
  productYearSeason2:[{
    id:number
    year:year
    season:season
  }]
  like2:number
}
type year = {
  id:number
  year:string
}
type season = {
  id:number
  name:string
}

export interface productScores {
  animation: number | null
  character:  number | null
  id: number
  music:  number | null
  performance:  number | null
  productId: number
  story:  number | null
  userId: number
  value:  number | null
  all : number | null
}

export interface productReviews {
    id:number
    content:string
    discribe:string
}

export interface productThreads {
  id:number
  title:string
  content:string
  discribe:string
}

export interface emotionList {
    id: number 
    emotion:string
    length:number
}


export interface userReview {
  id: number
  content: string
  episordId: number | null
  emotions:[{
    id: number
    emotion: string
  }]
}

export interface acsesses {
  acsessArray:number[]
  monthArray:number[]
}

export interface stats {
  10:number,
  20:number,
  30:number,
  40:number,
  50:number,
  60:number,
  70:number,
  80:number,
  90:number,
  100:number
}

export const iniStats:stats = {
  10:0,
  20:0,
  30:0,
  40:0,
  50:0,
  60:0,
  70:0,
  80:0,
  90:0,
  100:0
}

export interface product_genres {
  id:number
  name:string
} 



export interface style{
  id:number
  name:string
  count:number

  // children?: ReactNode;
}

export interface genre{
  id:number
  name:string
  count:number
}

export interface genreStore{
  id:number
  name:string
  // count:number
}

export interface heartProduct {
  heart:boolean
}



// import { LeftStyle } from "../component/aplication/Left_style"
// import { Lefts } from "../component/aplication/Left"

export interface productLikeCount {
  likeCount:number
  
}

export interface productScoreAverage {
  scoreAverage:string
  
}





// -------------

export interface productForm {

  id: number
  title: string
  imageUrl: string
  imageUrl2:string | undefined
  imageUrl3:string | undefined
  imageUrlh1:string | undefined
  imageUrlh2:string | undefined
  imageUrlh3:string | undefined


  arasuzi:string
  // 
  averageScore:string
  likeCount:number
  productGenres:[{
    id:number
    name:string
  }]
  productStyles:[{
    id:number
    name:string
  }]
  productReviews:[{
    id:number
    content:string
    discribe:string
  }]
  productThereds:[{
    id:number
    title:string
    content:string
    discribe:string
  }]
  questions:[{
    id:number
    question:string
  }]
  deliveryEnd:string
  deliveryStart:string

  year:string
  duration:string
  list:string
  
  rank:number
  averageScoreCount:number
  endJudge:string
  // averagescore:string

  episords:[{
    arasuzi: string
    episord: number
    id: number
    image: string
    // productId:number
    season: number
    seasonTitle: string
    time: Date | undefined
    title: string
    releaseDate:string
  }]
  productEpisord:{
    arasuzi: string
    episord: number
    image: string
    releaseDate: Date | undefined
  }
  yourScore:number
  tags:[{
    id:number
    tag:string
    rank:number
    genre:number
  }]
  scores:[{
    id:number
    value:number
    updatedAt:number|undefined
  }]
  // season:string
  pickup:boolean
  finished:boolean
  likes:[{
    id:number
    updatedAt:number|undefined

  }]
  acsesses:[{
    id:number
    count:number
    updatedAt:number|undefined
  }]
  reviews:[{
    id:number
    updatedAt:number|undefined
  }]

  productStudio:[{
    id:number
    company:string
  }]
  productYear:[{
    id:number
    year:string
  }]
  productCharacter:[{
    castName:{
      id: number
      name: string
    }
    id: number
    name: string
  }]
  productStaff:[{
    staffName:{
      id: number
      name: string
    }
    id: number
    name: string
  }]
  productKisetsu:[{
    id:number
    name:string
  }]
  // form-----------
  formStyle:[{
    value:string
    label:string
  }]
  formGenre:[{
    value:string
    label:string
  }]
  formCast:[{
    value:string
    label:string
  }]
  formCharacter:[{
    id:number
    castId: string;
    characterName: string;
    characterImage: string;
  }]
  formStudio:[{
    value:string
    label:string
  }]
  formStaff:[{
    value:string
    label:string
  }]
  formOccupation:[{
    castId: string;
    characterName: string;
  }]
  formYearSeason:[{
    year:string
    season:string[]
  }]
  overview:string

  copyright:string | undefined
  annitictId:number | undefined
  shoboiTid:number | undefined
  wikiEn:string | undefined
}

// product show

export interface productShow {
  EmotionLists:emotionList[]
  acsesses:acsesses
  products:product
  status:number
  scored: {scored: boolean,score:{id:number,value:number}|null}
  liked: {liked: false, like:{id:number}|null }
  productReviews: productReviews[]
  productThreads: productThreads[]
  emotionList: emotionList[]
  stats: {stats: number[]}
  productScores: productScores[]
}


// productScores: []
// stats: {stats: Array(10)}


// EmotionLists: []
// acsesses: {acsess_array: Array(12), month_array: Array(12)}
// liked: {liked: false, like: null}
// message: "Hello world!v2"
// productReviews: []
// productScores: []
// productThreads: []
// products: {id: 3, title: '進撃の巨人 The Final Season Part.2', image_url: null, arasuzi: null, list: 'https://shingeki.tv/', …}
// scored: {scored: false, score: null}
// stats: {stats: Array(10)}
// status: 200