import client from "../client/client"




export const execUpdateEpisord = (product_id:string,episord:number,title:string,time:Date|null,release_data:Date|null) => {
  return client.post(`/episords`, { 
    // params:{
      episord:episord,
      product_id:product_id,
      // product_id:undefined,
      title:title,
      time:time,
      release_date:release_data
    // }
  })
}

export const execDeleteEpisord = (product_id:string,episord:number) => {
  return client.delete(`/episords/${episord}`, { 
    params:{
      episord:episord,
      product_id:product_id,
    }
  })
}