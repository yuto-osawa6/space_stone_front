import client from "../../client/client"



export const execNewsCreate = (value:string,title:string,title2:string,info:string,date:Date) => {
  return client.post(`/admin/news`,{ 
    newmessage:{
      judge:value,
      title:title,
      description:title2,
      information:info,
      date:date
    }
  })
}



export const execDeleteNews = (id:number) => {
  return client.delete(`/admin/news/${id}`,{ 
    params:{
      news_id:id
    }
  })
}