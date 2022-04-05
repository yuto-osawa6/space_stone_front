import client from "lib/client/client"
import useSWRImmutable from 'swr/immutable'

type gridData = {
  grid:string
}

// export const execChangeGrid = (grid:string) => {
//   const fetcher = () => client.get('/mains/grid',{
//       params: {
//       grid
//       } 
//     })
//     .then(
//       (res) => {
//         console.log(res)
//         return res.data
//       })
//     // console.log(data)
//   const { data, error } = useSWRImmutable<gridData>('/mains/grid', fetcher)
//   console.log(data,error)
//   return { gridSwr: data, error }
// }

// export const execChangeGrid = (grid:string) => {
//   const fetcher = async() => {
//     // if (userSwr.login==false)return
//     const res =  await client.get('/mains/grid',{
//       params:{
//         grid
//       }
//     })
//     console.log(res)
//     // console.log(res.data.userTier)
//     return res.data
//   }
    
//   const { data, error } = useSWRImmutable<gridData>('/mains/grid', fetcher)
//   console.log(data,error)
//   return { gridSwr: data, error }
// }
