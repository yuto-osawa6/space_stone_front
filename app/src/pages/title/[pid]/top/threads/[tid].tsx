import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductThreads } from "@/components/title/thread/form/ProductThreads"
import { Top } from "@/components/title/top/Top"


import { product } from "@/interfaces/product"
import { review, review_comments } from "@/interfaces/review"
import { ssr_url } from "@/lib/client/clientssr"
import { useLocale } from "@/lib/ini/local/local"
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


type Props = {
  data:{
    product:product
    review:review
    reviewComments:review_comments[]
    status:number
  }
}

const ThreadShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()
  const title = Props.data.review.title?  Props.data.review.title :  `「${Props.data.product.title}」のスレッド`
  const describe = Props.data.review.title?`${Props.data.review.title} スレッドで話し合おう！`: `${Props.data.product.title} スレッドで話し合おう。`

  return(
  <>
      <NextSeo
        title={`${title} - ${t.domain}`}
        canonical = {`https://manime-tier.com/title/${Props.data.product.id}/threads/${Props.data.review.id}`}
        description = {`${describe}`}
        openGraph={{
          type: "website",
          title: `${title}`,
          description: `${describe}`,
          site_name: "アニメティア",
          url: `https://anime-tier.com/title/${Props.data.product.id}/top/threads/${Props.data.review.id}`,
          // images: [
          //   {
          //   // url: "https://www.example.ie/og-image-01.jpg",
          //     // url: image_path,
          //     width: 1200,
          //     height: 630,
          //     alt: 'Og Image Alt',
          //     type: 'image/png',
          //   },
          // ],
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <ProductThreads
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
      <ProductShow
      active={0}
      >
        <Top>
          {page}
        </Top>
      </ProductShow>   
    </ShareMain>
  )
}