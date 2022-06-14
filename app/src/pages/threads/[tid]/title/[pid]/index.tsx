import { ShareMain } from "@/components/share/main/ShareMain"
import { Threads } from "@/components/threads/Threads"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductThreads } from "@/components/title/thread/form/ProductThreads"


import { product } from "@/interfaces/product"
import { review, review_comments } from "@/interfaces/review"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"

import nookies from 'nookies'


export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { pid,tid } = context.query
  try{
    // const query_params = new URLSearchParams(params); 
    const [res] = await Promise.all([
      fetch(`${ssr_url}/products/${pid as string}/thereds/${tid as string}?page=1`,{
        headers:{
          "access-token": `${cookies._access_token}`,
          "client": `${cookies._client}`,
          "uid": `${cookies._uid}`
        }
      }), 
    ]);
    
    const [data] = await Promise.all([
      res.json()
    ]);
    if(data.status ==200){
    return { 
      props: { 
        data
      } 
    };
  }else{
    // return {props: { statesCode:res.status}}
    return { notFound:true}
  }
  }catch{
    // return  {props: { statesCode:500}}
    return { notFound:true}
  }
}
// type Props = {
//   data:productShow
// }


type Props = {
  data:{
    product:product
    review:review
    reviewComments:review_comments[]
    status:number
  }
}


const ThreadShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <ProductThreads
      data = {Props.data}
      />
    </>
  )
}

export default ThreadShow

ThreadShow.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      <Threads>
        {page}
      </Threads>
    </ShareMain>
  )
}