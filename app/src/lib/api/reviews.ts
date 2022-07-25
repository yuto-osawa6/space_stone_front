import client from "../client/client"

export const execCreateLikeReview = (product_id:string,review_id:string,user_id:number,goodbad:number) => {
  
  return client.post(`/products/${product_id}/reviews/${review_id}/like_reviews`, { 
    // params:{
      // text:text,
      // content:value,
      // discribe:discribe,
      // product_id:product_id,
      // user_id:user_id
  // }
  // like_reviews:{
  product_id:product_id,
  review_id:review_id,
  user_id:user_id,
  goodbad:goodbad
  // }
})
}
// /products/:product_id/reviews/:review_id/like_reviews/check

export const execCheckLikeReview = (product_id:string,review_id:string,user_id:number) => {
  
  return client.get(`/products/${product_id}/reviews/${review_id}/like_reviews/check`, { 
    params:{
  //     // text:text,
  //     // content:value,
  //     // discribe:discribe,
  //     product_id:product_id,
      user_id:user_id,
  //     review_id:review_id
  }
})
}



export const execDeleteLikeReview = (product_id:string,review_id:string,user_id:number,id:number) => {
  
  return client.delete(`/products/${product_id}/reviews/${review_id}/like_reviews/${id}`, { 
    data:{
      user_id:user_id
    }
})
}
// comment_review

export const execCreateCommentReview = (product_id:string,review_id:number,user_id:number,content:string,selectSort:string,reCaptchaToken:string) => {
  
  return client.post(`/products/${product_id}/reviews/${review_id}/comment_reviews`, { 
      comment_review:{
      user_id:user_id,
      comment:content,
      review_id:review_id
      },
      selectSort:selectSort,
      recaptcha_token:reCaptchaToken
})
}


// like_comment_review

export const execCreateLikeCommentReview = (comment_review_id:number,user_id:number,goodbad:number,review_id:string) => {
  return client.post(`/comment/like_comment_reviews`, { 
    like_comment_review:{
      comment_review_id:comment_review_id,
      user_id:user_id,
      goodbad:goodbad
    },
    review_id:review_id
  })
}

    // check
    // execCheckLikeCommentReview

    export const execCheckLikeCommentReview = (comment_review_id:number,user_id:number) => {
  
      return client.get(`/comment/like_comment_reviews/check`, { 
        params:{
          
          comment_review_id:comment_review_id,
          user_id:user_id
        }
       
    })
    }

    // delete

    

    export const execDeleteLikeCommentReview = (comment_review_id:number,user_id:number,like_comment_review_id:number,review_id:string) => {
  
      return client.delete(`/comment/like_comment_reviews/${like_comment_review_id}`, { 
        data:{
          user_id:user_id,
          comment_review_id:comment_review_id,
          review_id:review_id
        }  
    })
    }

// return comment
// execCreateReturnCommentReview

export const execCreateReturnCommentReview = (comment_review_id:number,user_id:number,content:string,review_id:string,reCaptchaToken:string) => {
  
  return client.post(`/comment/return_comment_reviews`, { 
      return_comment_review:{
      user_id:user_id,
      comment:content,
      comment_review_id:comment_review_id,
      },
      review_id:review_id,
      recaptcha_token:reCaptchaToken
})
}



export const execCheckReturnCommentReview = (comment_review_id:number) => {
  
  return client.get(`/comment/return_comment_reviews`, { 
    params:{
      comment_review_id:comment_review_id,
      // comment:content
    }
})
}
// v1.01
export const execReturenReviewIndexHandler = (comment_review_id:number,page:number) => {

  return client.get(`/comment/return_comment_reviews`, { 
    params:{
      comment_review_id:comment_review_id,
      page:page
      // comment:content
    }
})

}

// like_return_comment

export const execCreateLikeReturnCommentReview = (return_comment_review_id:number,user_id:number,goodbad:number,comment_review_id:number,review_id:string) => {

  return client.post(`/comment/return_comment_reviews/${return_comment_review_id}/like_return_comment_reviews`,{
    like_return_comment_review:{
      user_id:user_id,
      goodbad:goodbad,
      return_comment_review_id:return_comment_review_id
      },
      comment_review_id:comment_review_id,
      review_id:review_id
  })
}

// execDeleteLikeCommentReview

export const execDeleteLikeReturnCommentReview = (return_comment_review_id:number,user_id:number,id:number,comment_review_id:number,review_id:string) => {

  return client.delete(`/comment/return_comment_reviews/${return_comment_review_id}/like_return_comment_reviews/${id}`,{
   data:{
    return_comment_review_id:return_comment_review_id,
    user_id:user_id,
    comment_review_id:comment_review_id,
    review_id:review_id
   }
  })
}



export const execCheckLikeReturnCommentReview = (return_comment_review_id:number,user_id:number) => {

  return client.get(`/comment/return_comment_reviews/${return_comment_review_id}/like_return_comment_reviews`,{
   params:{
    user_id:user_id
   }
  })
}

// return return
// execCreateReturnReturnCommentReview

export const execCreateReturnReturnCommentReview = (comment_review_id:number,user_id:number,comment:string,return_comment_review_id:number,review_id:string,reCaptchaToken:string) => {

  return client.post(`/comment/return_comment_reviews/returnreturn`,{
      return_comment_review:{
        comment_review_id:comment_review_id,
        user_id:user_id,
        comment:comment
      },
      return_return_comment_review:{
        return_return_id:return_comment_review_id
      },
      review_id:review_id,
      recaptcha_token:reCaptchaToken
  })
}

// add sort

export const execProductReviewShowSort = (product_id:string,review_id:string,value:string,page:number) => {
  
  return client.get(`/products/${product_id}/reviews/sort`, { 
    params:{
      value:value,
      product_id:product_id,
      review_id:review_id,
      page:page
   }
})
}

// show acsess

export const execAcsessReviewCountHandler = (review_id:number | string,date:Date) => {
  return client.post(`/acsesses/acsess_reviews`,{
    review_id:review_id,
    date:date
  })
}

// index 

export const execReviewHandler = (page:number,selectSort:number|null,rangeNumber:number|undefined,rangeLikesNumber:number|undefined,rangePopulerNumber:number|undefined,product_id:number|undefined,emotion: number | undefined) => {

  return client.get(`reviews/`,{
    params:{
      page:page,
      selectSort:selectSort,
      product_id:product_id,
      rangeNumber:rangeNumber,
      rangeLikesNumber:rangeLikesNumber,
      rangePopulerNumber:rangePopulerNumber,
      emotion:emotion
    }
  })
}


// delete

export const execDeleteComment = (product_id:string,review_id:string,comment_reviews_id:number) => {
  
  return client.delete(`/products/${product_id}/reviews/${review_id}/comment_reviews/${comment_reviews_id}`, { 
  //   params:{
  //     value:value,
  //     product_id:product_id,
  //     review_id:review_id,
  //     page:page
  //  }
})
}

export const execDeleteReturnComment = (comment_reviews_id:number,comment_review_id:number,review_id:string ) => {
  return client.delete(`/comment/return_comment_reviews/${comment_reviews_id}`, { 
    data:{
      review_id:review_id,
      comment_review_id:comment_review_id
    }
  })
}