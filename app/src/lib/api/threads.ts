import client from "../client/client"

export const execProductThreadShow = (product_id:string,review_id:string) => {
  
  return client.get(`/products/${product_id}/thereds/${review_id}`, { 
   params:{
    //  user_id:user_id
    //  product_id:product_id,
    //  review_id:review_id
   }
})
}

export const execCheckLikeThread = (product_id:string,review_id:string,user_id:number) => {
  
  return client.get(`/products/${product_id}/thereds/${review_id}/like_threads/check`, { 
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

export const execCreateLikeThread = (product_id:string,review_id:string,user_id:number,goodbad:number) => {
  
  return client.post(`/products/${product_id}/thereds/${review_id}/like_threads`, { 
    // params:{
      // text:text,
      // content:value,
      // discribe:discribe,
      // product_id:product_id,
      // user_id:user_id
  // }
  // like_reviews:{
  product_id:product_id,
  thered_id:review_id,
  user_id:user_id,
  goodbad:goodbad
  // }
})
}



export const execDeleteLikeThread = (product_id:string,review_id:string,user_id:number,id:number) => {
  
  return client.delete(`/products/${product_id}/thereds/${review_id}/like_threads/${id}`, { 
    data:{
      user_id:user_id
    }
})
}
// 
export const execCreateCommentThread = (product_id:string,review_id:number,user_id:number,content:string,value:string) => {
  
  return client.post(`/products/${product_id}/thereds/${review_id}/comment_threads`, { 
    comment_thread:{
      user_id:user_id,
      comment:content,
      thered_id:review_id
      },
      value:value
})
}

// 
export const execCreateLikeCommentThread = (comment_review_id:number,user_id:number,goodbad:number,thread_id:string) => {
  
  return client.post(`/comment/like_comment_threads`, { 
      // comment_review:{
      // user_id:user_id,
      // comment:content,
      // review_id:review_id
      // }
    like_comment_thread:{
      comment_thread_id:comment_review_id,
      user_id:user_id,
      goodbad:goodbad
      },
    thread_id:thread_id
})
}

export const execCheckLikeCommentThread = (comment_review_id:number,user_id:number) => {
  
  return client.get(`/comment/like_comment_threads/check`, { 
    params:{
      
      comment_thread_id:comment_review_id,
      user_id:user_id
    }
   
})
}

export const execDeleteLikeCommentThread = (comment_review_id:number,user_id:number,like_comment_review_id:number,thread_id:string) => {
  
  return client.delete(`/comment/like_comment_threads/${like_comment_review_id}`, { 
    data:{
      user_id:user_id,
      comment_thread_id:comment_review_id,
      thread_id:thread_id
    }  
})
}

// 
export const execCreateReturnCommentThread = (comment_review_id:number,user_id:number,content:string,thread_id:string) => {
  
  return client.post(`/comment/return_comment_threads`, { 
      return_comment_thread:{
      user_id:user_id,
      comment:content,
      comment_thread_id:comment_review_id
      },
      thread_id:thread_id
})
}


export const execCheckReturnCommentThread = (comment_review_id:number) => {
  
  return client.get(`/comment/return_comment_threads`, { 
    params:{
      comment_thread_id:comment_review_id,
      // comment:content
    }
})
}

// 
export const execCreateLikeReturnCommentThread= (return_comment_review_id:number,user_id:number,goodbad:number,comment_thread_id:number,thread_id:string) => {

  return client.post(`/comment/return_comment_threads/${return_comment_review_id}/like_return_comment_threads`,{
    like_return_comment_thread:{
      user_id:user_id,
      goodbad:goodbad,
      return_comment_thread_id:return_comment_review_id
      },
      comment_thread_id:comment_thread_id,
      thread_id:thread_id
  })
}

export const execDeleteLikeReturnCommentThread = (return_comment_review_id:number,user_id:number,id:number,comment_thread_id:number,thread_id:string) => {

  return client.delete(`/comment/return_comment_threads/${return_comment_review_id}/like_return_comment_threads/${id}`,{
   data:{
    return_comment_thread_id:return_comment_review_id,
    user_id:user_id,
    comment_thread_id:comment_thread_id,
    thread_id:thread_id
   }
  })
}

export const execCheckLikeReturnCommentThread = (return_comment_review_id:number,user_id:number) => {

  return client.get(`/comment/return_comment_threads/${return_comment_review_id}/like_return_comment_threads`,{
   params:{
    user_id:user_id
   }
  })
}
// 



export const execCreateReturnReturnCommentThread = (comment_review_id:number,user_id:number,comment:string,return_comment_review_id:number,thread_id:string) => {

  return client.post(`/comment/return_comment_threads/returnreturn`,{
    return_comment_thread:{
      comment_thread_id:comment_review_id,
      user_id:user_id,
      comment:comment 
      },
      return_return_comment_thread:{
      return_return_thread_id:return_comment_review_id
      },
      thread_id:thread_id
  })
}
// show acsess
export const execAcsessThreadCountHandler = (review_id:number | string,date:Date) => {
  return client.post(`/acsesses/acsess_threads`,{
    thered_id:review_id,
    date:date
  })
}



// add sort

export const execProductThreadShowSort = (product_id:string,thered_id:string,value:string,page:number) => {
  
  return client.get(`/products/${product_id}/thereds/sort`, { 
    params:{
      value:value,
      product_id:product_id,
      thered_id:thered_id,
      page:page
   }
})
}


// index

export const execThreadHandler = (page:number,selectSort:number|null,rangeNumber:number|undefined,rangeLikesNumber:number|undefined,rangePopulerNumber:number|undefined,product_id:number|undefined) => {

  return client.get(`thereds/`,{
    params:{
      page:page,
      selectSort:selectSort,
      product_id:product_id,
      rangeNumber:rangeNumber,
      rangeLikesNumber:rangeLikesNumber,
      rangePopulerNumber:rangePopulerNumber
    }
  })
}



// v1.01
export const execReturenThreadIndexHandler = (comment_review_id:number,page:number) => {

  return client.get(`/comment/return_comment_threads`, { 
    params:{
      comment_thread_id:comment_review_id,
      page:page
      // comment:content
    }
})

}
// export const execCheckReturnCommentThread = (comment_review_id:number) => {
  
//   return client.get(`/comment/return_comment_threads`, { 
//     params:{
//       comment_thread_id:comment_review_id,
//       // comment:content
//     }
// })
// }


export const execDeleteThreadComment = (product_id:string,review_id:string,comment_reviews_id:number) => {
  
  return client.delete(`/products/${product_id}/thereds/${review_id}/comment_threads/${comment_reviews_id}`, { 
  //   params:{
  //     value:value,
  //     product_id:product_id,
  //     review_id:review_id,
  //     page:page
  //  }
})
}

export const execDeleteReturnThreadComment = (comment_reviews_id:number,comment_thread_id:number,thread_id:string) => {
  
  return client.delete(`/comment/return_comment_threads/${comment_reviews_id}`, { 
    data:{
      thread_id:thread_id,
      comment_thread_id:comment_thread_id
    }
})
}

