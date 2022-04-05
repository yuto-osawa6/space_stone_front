import client from "../../client/client"



export const execCreateFormat = (name:string) => {

  return client.post(`/styles`,{
    styles:{
      name:name
    }
   
  })
}

export const execGetFormatsList = () => {

  return client.get(`styles`,{
    
  })
}