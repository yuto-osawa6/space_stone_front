import Cookies from "js-cookie"
import client from "@/lib/client/client"

// 動作確認用
// export const execTest = () => {
//   return client.get("/products")
// }

export const execProductShow = (id:number) => {
  return client.get(`/products/${id}`,{ headers: {
    "access-token": `${Cookies.get("_access_token")}`,
    "client": `${Cookies.get("_client")}`,
    "uid": `${Cookies.get("_uid")}`
  }})
}

// export const execProductUserLikesCheck = (id:number) => {
//   return client.get(`/products`)
// }

export const execProductCreateHeart = (id:number,user_id:number) => {
  return client.post(`/products/${id}/likes`,{ 
    user_id:user_id,
    product_id:id
  })
}

// execCheckingHeart

export const execCheckingHeart = (id:number,user_id:number) => {
  return client.get(`/products/${id}/likes/check`,{
    params:{user_id}
  })
}


export const execProductDeleteHeart = (id:number,like:number,user_id:number) => {
  return client.delete(`products/${id}/likes/${like}`,{
    data:{user_id}
  })
}

export const execScoreCreate = (id:number,user_id:number,value:number | null | undefined,mmusic:number | null | undefined,performance:number | null | undefined,story:number | null | undefined,character:number | null | undefined,animation:number | null | undefined,all_avg:number) => {
  return client.post(`/products/${id}/scores`,{
  //  value:value,
  //  user_id:user_id,
  //  product_id:id
  score:{
    all:value,
    user_id:user_id,
    product_id:id,
    music:mmusic,
    animation:animation,
    story:story,
    performance:performance,
    character:character,
    value:all_avg
    }
  })
}

// execScoreCreate

export const execScoreUpdate = (id:number,user_id:number,value:number | null | undefined,score_id:number,mmusic:number | null | undefined,performance:number | null | undefined,story:number | null | undefined,character:number | null | undefined,animation:number | null | undefined,all_avg:number) => {
  return client.patch(`/products/${id}/scores/${score_id}`,{
    score:{
    all:value,
    user_id:user_id,
    product_id:id,
    music:mmusic,
    animation:animation,
    story:story,
    performance:performance,
    character:character,
    value:all_avg
    }
  })
}

// score delete
export const execDestroyScore = (id:number,user_id:number,score_id:number) => {
  return client.delete(`/products/${id}/scores/${score_id}`,{
    params:{
      user_id:user_id,
      product_id:id,
    }
  })
}
// acsesses
// execAcsesscount

export const execAcsesscount = (id:number,current_time:Date) => {
  return client.post(`/products/${id}/acsesses`,{
    product_id:id,
    current_time:current_time
  })
}

// review
export const execCreateReview = (select:string,text:string,value:string,discribe:string,product_id:number,user_id:number,emotions:string[],reToken:string,firstValue:number) => {
  
  return client.post(`/products/${product_id}/reviews`, { 
    // params:{
      review:{
      episord_id:select,
      text:text,
      content:value,
      discribe:discribe,
      product_id:product_id,
      user_id:user_id,
      emotion_ids:emotions,
      score:firstValue,
      // review_emotions:[{
      //   product_id:1,
      //   emotion_id:1,
      //   episord_id:1,
      // }]
      },
      recaptcha_token:reToken
  // }
})
}

  // review update
  
  export const execUpdateReview = (review_id:number,select:string,text:string,value:string,discribe:string,product_id:number,user_id:number,emotions:string[],reCaptchaToken:string) => {
  
    return client.patch(`/products/${product_id}/reviews/${review_id}`, { 
      // params:{
        review:{
        episord_id:select,
        text:text,
        content:value,
        discribe:discribe,
        product_id:product_id,
        user_id:user_id,
        emotion_ids:emotions,
        // review_emotions:[{
        //   product_id:1,
        //   emotion_id:1,
        //   episord_id:1,
        // }]
        },
        recaptcha_token:reCaptchaToken
    // }
  })
  }
  export const execUpdate2Review = (review_id:number,select:string,text:string,value:string,discribe:string,product_id:number,user_id:number,emotions:string[],reCaptchaToken:string) => {
  
    return client.patch(`/products/${product_id}/reviews/${review_id}/update2`, { 
      // params:{
        review:{
        episord_id:select,
        text:text,
        content:value,
        discribe:discribe,
        product_id:product_id,
        user_id:user_id,
        emotion_ids:emotions,
        // review_emotions:[{
        //   product_id:1,
        //   emotion_id:1,
        //   episord_id:1,
        // }]
        },
        recaptcha_token:reCaptchaToken
    // }
  })
  }
  export const execSecondUpdateReview = (product_id:number,user_id:number) => {
  
    return client.get(`/products/${product_id}/reviews/second`, { 
      params:{
      user_id:user_id
    }
  })
  }
  // delete
  export const execDeleteReview = (product_id:number,review_id:number) => {
    return client.delete(`/products/${product_id}/reviews/${review_id}`, { 
    //   params:{
    //   //  user_id:user_id
    // }
  })
  }

// thered
export const execCreateThered = (text:string,value:string,discribe:string,product_id:number,user_id:number,thered_question_questions_ids:string[],reCaptchaToken:string) => {
  
  return client.post(`/products/${product_id}/thereds`, { 
    // params:{
      "thered":{title:text,
      content:value,
      discribe:discribe,
      product_id:product_id,
      user_id:user_id,
      question_ids:thered_question_questions_ids,
      // tt:"aa"
      
    },
    recaptcha_token:reCaptchaToken
  // }
})
}

export const execDeleteThread = (product_id:number,review_id:number) => {
  return client.delete(`/products/${product_id}/thereds/${review_id}`, { 
})
}

export const execSecondUpdateThread = (product_id:number) => {
  return client.get(`/products/${product_id}/thereds/second`, { 
  })
}
// product_review
export const execProductReviewShow = (product_id:string,review_id:string,page:number) => {
  
  return client.get(`/products/${product_id}/reviews/${review_id}`, { 
   params:{
     page:page
    //  user_id:user_id
    //  product_id:product_id,
    //  review_id:review_id
   }
})
}

// product_show_episords

export const execProductShowEpisord = (product_id:string,page:number) => {
  
  return client.get(`/products/product_episords`, { 
   params:{
    product_id:product_id,
    page:page
   }
  })
}


export const execProductShowReview = (product_id:string,page:number,episords: string[]) => {
  
  return client.get(`/products/product_review`, { 
   params:{
    product_id:product_id,
    page:page,
    episords:episords
   }
  })
}

export const execProductShowThread = (product_id:string,page:number) => {
  
  return client.get(`/products/product_thread`, { 
   params:{
    product_id:product_id,
    page:page
   }
  })
}

export const execProductShowThreadOfficial = (product_id:string,page:number) => {
  
  return client.get(`/products/product_thread_official`, { 
   params:{
    product_id:product_id,
    page:page
   }
  })
}


// compare

export const  execCompareScore = (product_id:number,index:number) => {
  return client.get(`/products/${product_id}/compare_score`, { 
    params:{
    product_id:product_id,
    index:index
    }
  })
}

export const execCompareEmotion = (product_id:number,episord_id:number) => {
  return client.get(`/products/${product_id}/compare_emotion`, { 
    params:{
    product_id:product_id,
    episord_id:episord_id
    }
  })
}



export const execCompareTier= (product_id:number,user_id:number | null,alice:number) => {
  return client.get(`/products/${product_id}/compare_tier`, { 
    params:{
    product_id:product_id,
    user_id:user_id,
    alice: alice,
    }
  })
}