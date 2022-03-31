import client from "../../client/client"



export const execNewsCreate = (value:string,title:string,title2:string) => {
  return client.post(`/admin/news`,{ 
    newmessage:{
      judge:value,
      title:title,
      description:title2
    }
   
  })
}