import { amber } from "@mui/material/colors"
import client from "../client/client"



export const execCreateArticle = (user_id:number,content:string,text:string,radio:number,productIds:string[],hashIds:string[]) => {

  return client.post(`/admin/articles`,{
    // product_id:product_id,
    article:{
    user_id:user_id,
    content:content,
    title:text,
    weekormonth:radio,
    product_ids:productIds,
    hashtag_ids:hashIds
    }
  })
}
export const execUpdateArticle = (article_id:number,user_id:number,content:string,text:string,radio:number,productIds:string[]) => {

  return client.patch(`/admin/articles/${article_id}`,{
    article:{
    user_id:user_id,
    content:content,
    title:text,
    weekormonth:radio,
    product_ids:productIds
    }
  })
}

export const execDeleteArticle = (article_id:number) => {

  return client.delete(`/admin/articles/${article_id}`,{
    // article:{
    // user_id:user_id,
    // content:content,
    // title:text,
    // weekormonth:radio,
    // product_ids:productIds
    // }
  })
}


export const uploadArticleFile = (data:FormData)=> {
  const kazuki = {name:"kazuki",year:"2020"}
  const a:string = `name:kazuki,year:2020`
  // b = {name:amber,size:""}

  return client.post(`/admin/articles/uploadfile`,data,{

    headers:{
      "content-type": "multipart/form-data"
    },
    
    // kazuki
  })
}

// article

export const execArticleProductList = ()=> {

  return client.get(`/admin/articles/productlist`,{
  
  })
}


// article index

export const execArticleHandler = (page:number,weekormonth:number|null,product_id:number|undefined)=> {

  return client.get(`/articles`,{
    params:{
      page:page,
      weekormonth:weekormonth,
      product_id:product_id
    }
  })
}

// article associate product

export const execArticleProductAssosiationsHandler = (product_id:number) => {

  return client.get(`/articles/associate`,{
    params:{
      product_id:product_id
    }
  })
}

// article associate article

export const execArticleArticleAssosiationsHandler = (article_id:string) => {
  return client.get(`/articles/article_associate`,{
    params:{
      article_id:article_id
    }
  })
}

// article show


export const execArticleShowHandler = (article_id:string) => {
  return client.get(`/articles/show`,{
    params:{
      article_id:article_id
    }
  })
}

// count



export const execAcsessArticleCountHandler = (review_id:number | string,date:Date) => {
  return client.post(`/acsesses/acsess_articles`,{
    article_id:review_id,
    date:date
  })
}

export const execSubmitHash = (hash:string) => {
  return client.post(`/hashtags`,{
    hash:hash
  })
}