import client from "../../client/client"


export const execToptenLikeAll  = () => {
  return client.get("mainblocks/toptens/topten_l",{
    params:{
    }
  })
}
export const execToptenLikeMonth  = () => {
  return client.get("mainblocks/toptens/topten_lm",{
    params:{
    }
  })
}
export const execToptenScoreAll  = () => {
  return client.get("mainblocks/toptens/topten_s",{
    params:{
    }
  })
}
export const execToptenScoreMonth  = () => {
  return client.get("mainblocks/toptens/topten_sm",{
    params:{
    }
  })
}
export const execToptenAcsessAll  = () => {
  return client.get("mainblocks/toptens/topten_a",{
    params:{
    }
  })
}
export const execToptenAcsessMonth  = () => {
  return client.get("mainblocks/toptens/topten_am",{
    params:{
    }
  })
}
export const execToptenReviewAll  = () => {
  return client.get("mainblocks/toptens/topten_r",{
    params:{
    }
  })
}
export const execToptenReviewMonth  = () => {
  return client.get("mainblocks/toptens/topten_rm",{
    params:{
    }
  })
}