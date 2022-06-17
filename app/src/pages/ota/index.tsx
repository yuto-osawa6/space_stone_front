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
import { exec_sessions } from "@/lib/api/session/session"
import nookies from 'nookies'

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const cookies = nookies.get(ctx)
  console.log(cookies)
  // const { pid } = context.query
  // const params = {
  //   active:"1",
  //   last:"2"
  // }
  // const query_params = new URLSearchParams(params); 
  // const [productShowRes] = await Promise.all([
  //   fetch(`${process.env.API_PATH_V1}/products/${18}/seo`), 
  //   // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/pickup?`+ query_params),
  //   // fetch(`${process.env.API_PATH_V1}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams))
  //   // fetch(`${process.env.ApiPathV1}/mainblocks/mains/update_tier_list?`+)
  // ]);
  // const [data] = await Promise.all([
  //   productShowRes.json()
  // ]);
  return { 
    props: { 
      // data
    } 
  };
}

type Props = {
  // getLayout: (page: any) => JSX.Element
  // children:ReactNode
  // data?:productShow
}

const Ota: React.FC<Props>& { getLayout: (page: any) => JSX.Element } = (Props) => {
  console.log(new Date())
  // const { userSwr, error } = useUser()
  // const changeGridexec = async() => {
  //   const res = await exec_sessions()
  //   if (res.status === 200) {
  //     console.log(res)
  //   }
  // }

  // useEffect(()=>{
  //   changeGridexec()
  // },[])
  return(
    <>
     aaa

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