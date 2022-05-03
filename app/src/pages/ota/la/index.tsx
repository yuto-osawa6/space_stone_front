import { ShareMain } from "@/components/share/main/ShareMain"
import { productShow } from "@/interfaces/product"
import { execChangeGrid } from "@/lib/api/main"
// import { useGetCurrentUser } from "@/lib/api/users/sign"
import { useUser } from "@/lib/data/user/useUser"
import { GetServerSideProps, GetStaticProps } from "next"
import Link from "next/link"
import TitleIndex from "@/pages/title/[pid]"
import { useEffect } from "react"
import useSWR from "swr"
import { Ota2 } from "@/components/ota/Ota"
import Ota from ".."



// export const  getStaticProps: GetStaticProps = async(context) => {
//   // const { pid } = context.query
//   // const params = {
//   //   active:"1",
//   //   last:"2"
//   // }
//   // const query_params = new URLSearchParams(params); 
//   // const [productShowRes] = await Promise.all([
//   //   fetch(`${process.env.API_PATH_V1}/products/red`), 
//   // ]);
//   const res = await fetch(`${process.env.API_PATH_V1}/products/red`)
//   const data = await res.json()

//   // if (productShowRes.status !== 200) {
//     if (res.status !== 200) {
//       return {
//         notFound: true
//       };
//     }
    
//   // const [data] = await Promise.all([
//   //   productShowRes.json()
//   // ]);
  
//   return { 
//     props: { 
//       data
//     } 
//   };
// }

type Props = {
  // getLayout: (page: any) => JSX.Element
  // children:ReactNode
  // data?:productShow
  // data:{
  //   message:string
  // }
}


const Home2: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  // console.log(Props.data)
  // const {data,error} = getCurrentUser()
  // const { data, error } = useSWR('/session_user')
  // const { userSwr, error } = useUser()
  // console.log(data)
  // const changeGridexec = async() => {
  //   // console.log(grid)
  //   const res = await execChangeGrid("01")
  //   if (res.status === 200) {
  //     // dispatch(GridAction(res.data.grid))
  //   }
  // }

  // useEffect(()=>{
  //   console.log(window)
  //   // if(typeof window !== 'undefined')return
  //   changeGridexec()
  // },[])


  return(
    <>
     {/* Ota2>
      aaa aaa
      <Ota2></
      {Props.data.message.length>0?
      <div className="">
        tests
      </div>
      :
        <div className="">nocontent</div>
      } */}
    </>
  )
}

export default Home2


Home2.getLayout = function getLayout(page) {
  return (
    // <ShareMain>
    <div className="">
      {page}
    </div>
  )
}
