import client from "../../client/client"


export const execCreateStudiosLib = (name:string) => {

  return client.post(`/studios`,{
    studios:{
      company:name
    }
   
  })
}

export const execGetStudiosList = () => {

  return client.get(`studios`,{
    
  })
}