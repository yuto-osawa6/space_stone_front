import { ShareMain } from "@/components/share/main/ShareMain"
import { productShow } from "@/interfaces/product"
import { execChangeGrid } from "@/lib/api/main"
// import { getCurrentUser } from "@/lib/api/users/sign"
import { useUser } from "@/lib/data/user/useUser"
import { GetServerSideProps, GetStaticProps } from "next"
import Link from "next/link"
import TitleIndex from "@/pages/title/[pid]"
import { useEffect } from "react"
import useSWR from "swr"
import { Ota2 } from "@/components/ota/Ota"
import Ota from ".."


// type Props = {
//   // getLayout: (page: any) => JSX.Element
// }

// export const  getStaticProps: GetStaticProps = async(context) => {
//   // const { pid } = context.query
//   const params = {
//     active:"1",
//     last:"2"
//   }
//   const query_params = new URLSearchParams(params); 
//   const [productShowRes] = await Promise.all([
//     fetch(`${process.env.API_PATH_V1}/products/${1}`), 
//     // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/pickup?`+ query_params),
//     // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams))
//     // fetch(`${process.env.ApiPathV1}/mainblocks/mains/update_tier_list?`+)
//   ]);
//   const [data] = await Promise.all([
//     productShowRes.json()
//   ]);
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
}


const Otare: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  // const {data,error} = getCurrentUser()
  // const { data, error } = useSWR('/session_user')
  const { userSwr, error } = useUser()
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
      aaa
      {/* <Ota
      data={Props.data}
      >
      </Ota> */}
      <Ota2></Ota2>
      aaa
      {/* <Link href="/ota">
          <a>pome</a>
      </Link>
      <Ota
        data={Props.data}
      >
        kkkkkkkkkkkkkkkkkkkkkkkkkkk
      </Ota>
      <Link href="/ota/po/1">
          <a>pome</a>
      </Link> */}
    </>
  )
}

export default Otare


Otare.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}

// const Otare: React.FC<Props> = () => {
//   return(
//     <><>
//   )
// }