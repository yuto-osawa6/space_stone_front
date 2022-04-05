// const execCreateCharacter 

import client from "../../client/client"

// (cast)
export const execCreateCharacter  = (name:string) => {

  return client.post(`/casts`,{
    cast:{
      name:name
    }
   
  })
}

export const execGetCharacterList = () => {

  return client.get(`casts`,{
    
  })
}