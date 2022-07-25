import { product } from "@/interfaces/product";

export const testProductData:product = {
  id: 1,
  title: "test_title",
  imageUrl: "http://test_imageUrl",
  arasuzi:"test_arasuzi",
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
  averageScore:"10",
  likeCount:1,
  productGenres:[{
    id:1,
    name:"test_name"
  }],
  productStyles:[{
    id:1,
    name:"test_name"
  }],
  productReviews:[{
    id:1,
    content:"test_arasuzi",
    discribe:"test_discribe"
  }],
  productThereds:[{
    id:1,
    title:"test_title_thread",
    content:"test_title_content",
    discribe:"test_title_discribe",
  }],
  questions:[{
    id:1,
    question:"question"
  }],
  deliveryEnd:"",
  deliveryStart:"",

  year:"2022",
  duration:"",
  list:"test_list",
  
  rank:1,
  averageScoreCount:1,
  endJudge:"",

  episords:[{
    arasuzi: "test_episord_arasuzi",
    episord: 0,
    id: 0,
    image: "test_episord_image",
    // productId:number
    season: 0,
    seasonTitle: "test_episord_season_title",
    time: undefined,
    title: "test_episord_title",
    releaseDate:"",
  }],
  yourScore:0,
  tags:[{
    id:1,
    tag:"test_tag",
    rank:1,
    genre:0,
  }],
  scores:[{
    id:1,
    value:10,
    updatedAt:undefined
  }],
  // season:"",
  pickup:false,
  finished:false,
  likes:[{
    id:1,
    updatedAt:undefined
  }],
  acsesses:[{
    id:1,
    count:1,
    updatedAt:undefined
  }],
  reviews:[{
    id:1,
    updatedAt:undefined
  }],
  productEpisord:{
    arasuzi: "test_product_episord_arasuzi",
    episord: 0,
    image: "",
    releaseDate:undefined
  },
  productStudio:[{
    id:0,
    company:"test_studio_company"
  }],
  productCharacter:[{
    castName:{
      id: 1,
      name: "test_product_character",
    },
    id: 1,
    name: "test_product_character_name",
  }],
  productStaff:[{
    staffName:{
      id: 0,
      name: "test_staff"
    },
    id: 0,
    name: "test"
  }],
  productKisetsu:[{
    id:1,
    name:"test_kisetsu"
  }],
  productYearSeason:[{
    year:"2022",
    season:[{
      id:"1",
      name:"春"
    }]
  }],
  userReviews:[{
    id: 1,
    content: "test_user_review_content",
    episordId: null,
    emotions:[{
      id: 0,
      emotion: "test_emotion"
    }],
    score:0
   
    // productId: 0,
    // userId: 1
  }],
  emotions:[{
    id: 1, 
    emotion: ''
}],
emotionList: [{
  id: 1, 
  emotion:"",
  // length:[{
  //   id:0,
  //   productId:0
  // }]
  length:1
}],
overview:"test_overview",
productWeekly:[{
    id:0,
    count:0,
    weekly:undefined
  }],
  avg:"50",
  tier:"50",
  productYearSeason2:[{
    id:1,
    year:{
      id:1,
      year:"2022"
    },
    season:{
      id:2,
      name:"春"
    },
  }],
  like2:1
}