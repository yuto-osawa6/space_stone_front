import { ShareMain } from "@/components/share/main/ShareMain"
import { Threads } from "@/components/threads/Threads"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductThreads } from "@/components/title/thread/form/ProductThreads"
import { UserShowThreads } from "@/components/users/show/main/threads/UserShowThreads"
import { UsersShow } from "@/components/users/show/UsersShow"


import { product } from "@/interfaces/product"
import { review, review_comments } from "@/interfaces/review"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import nookies from 'nookies'


export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { pid,tid } = context.query
  try{
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
    return { notFound:true}
  }
  }catch{
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
  // const fallback= Props.fallback
  return(
    <>
      <NextSeo
      canonical = {`https://meruplanet.com/title/${Props.data.product.id}/threads/${Props.data.review.id}`}
      />
      <ProductThreads
        // data={Props}
        data={Props.data}
      />
    </>
  )
}

export default ThreadShow

ThreadShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <UsersShow>
        <UserShowThreads>
          {page}
        </UserShowThreads>
      </UsersShow>
    </ShareMain>
  )
}