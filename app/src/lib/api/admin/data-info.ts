


import client from "../../client/client"


export const execDataInfo = () => {
  return client.get(`/admin/data_infos`,{ 
  })
}

export const execUpdateDataInfo = (info:string) => {
  return client.patch(`/admin/data_infos/1`,{ 
    info_id:1,
    info:info
  })
}