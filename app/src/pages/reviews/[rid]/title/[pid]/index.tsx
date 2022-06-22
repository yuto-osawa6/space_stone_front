import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductShowReviews } from "@/components/title/review/ProductReviews"
import { Reviews } from "@/components/reviews/Reviews"
import { product } from "@/interfaces/product"
import { review, review_comments } from "@/interfaces/review"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"

import nookies from 'nookies'
import { NextSeo } from "next-seo"
import { useLocale } from "@/lib/ini/local/local"


export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { pid,rid } = context.query
  try{
    const [res] = await Promise.all([
      fetch(`${ssr_url}/products/${pid as string}/reviews/${rid as string}?page=1`,{
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

const ReviewShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
  <>
      <NextSeo
      title={`Review - ${t.domain}`}
      canonical = {`https://meruplanet.com/title/${Props.data.product.id}/reviews/${Props.data.review.id}`}
      />
      <ProductReviews
      data = {Props.data}
      />
    </>
  )
}

export default ReviewShow

ReviewShow.getLayout = (page) => {
  return (
    <ShareMain
      // locationNumber={1}
    >
      {/* <ProductShow
      // data = {Props.data}
      > */}
        {/* <ProductShowReviews> */}
        <Reviews>
          {page}
        </Reviews>
        {/* </ProductShowReviews> */}
      {/* </ProductShow>    */}
    </ShareMain>
  )
}