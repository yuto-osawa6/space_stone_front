import client from "../../client/client"


export const execCreateStaffLib = (name:string) => {

  return client.post(`/staffs`,{
    staffs:{
      name:name
    }
   
  })
}

export const execGetStaffList = () => {

  return client.get(`staffs`,{
    
  })
}