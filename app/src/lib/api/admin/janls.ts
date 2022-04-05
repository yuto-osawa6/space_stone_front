import client from "../../client/client"

export const execCreateGenreLib = (name:string) => {

  return client.post(`/janls`,{
    janls:{
      name:name
    }
   
  })
}

export const execGetGenresList = () => {

  return client.get(`janls`,{
    
  })
}