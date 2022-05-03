import { ShareMain } from "@/components/share/main/ShareMain"
import { productShow } from "@/interfaces/product"
import { execChangeGrid } from "@/lib/api/main"
// import { getCurrentUser } from "@/lib/api/users/sign"
import { useUser } from "@/lib/data/user/useUser"
import { GetServerSideProps, GetStaticProps } from "next"
import Link from "next/link"
import TitleIndex from "@/pages/title/[pid]"
import { ReactNode, useEffect } from "react"
import useSWR from "swr"
import { NextSeo } from 'next-seo';


export const getStaticProps: GetStaticProps = async(context) => {
  // const { pid } = context.query
  const params = {
    active:"1",
    last:"2"
  }
  const query_params = new URLSearchParams(params); 
  const [productShowRes] = await Promise.all([
    fetch(`${process.env.API_PATH_V1}/products/${18}/seo`), 
    // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/pickup?`+ query_params),
    // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams))
    // fetch(`${process.env.ApiPathV1}/mainblocks/mains/update_tier_list?`+)
  ]);
  const [data] = await Promise.all([
    productShowRes.json()
  ]);
  return { 
    props: { 
      data
    } 
  };
}

type Props = {
  // getLayout: (page: any) => JSX.Element
  children:ReactNode
  data?:productShow
}

const Ota: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
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
  console.log(Props)
  return(
    <>
      <NextSeo
       title={`${Props.data?.products.title} - SpaceTone`}
      //  description={Props.data.products.}
      >
      </NextSeo>
      {/* <ShareMain> */}
        {/* aaaaaaaaajklkaaaaafl */}
        {/* {userSwr.user?.nickname} */}
      {/* </ShareMain> */}
      {/* {Props.data!=undefined&&(
      <TitleIndex
      data={Props.data}
      >

      </TitleIndex>
      )} */}
      <Link href="/ota/po">
          <a>Home</a>
      </Link>
      <div className="">
        {Props.data?.products.imageUrl}
      </div>
      aaaaaaallllllllllllllaaa
      <div className="">
        {Props.children}
      </div>
      bbbbbbb

      <Link href={`/title/${Props.data?.products.id}`}>
          <a>Home</a>
      </Link>

    </>
  )
}

export default Ota


Ota.getLayout = function getLayout(page) {
  return (
    <ShareMain>
      {page}
    </ShareMain>
  )
}