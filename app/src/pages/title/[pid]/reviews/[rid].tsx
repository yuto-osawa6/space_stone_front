import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductShowReviews } from "@/components/title/review/ProductReviews"
import { product } from "@/interfaces/product"
import { review, review_comments } from "@/interfaces/review"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"
import nookies from 'nookies'
import Error from "@/pages/_error"
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
  },
  statesCode:number,
  message:string
}

const ReviewShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()

  return(
    <>
       <NextSeo
        title={`「${Props.data.product.title}」のレビュー - ${t.domain}`}
        canonical = {`https://meruplanet.com/title/${Props.data.product.id}/reviews/${Props.data.review.id}`}
        description = {`「${Props.data.product.title}」のレビュー。レビューをチェックして、感想をシェアしよう。`}
        openGraph={{
          type: "website",
          title: `「${Props.data.product.title}」のレビュー - ${t.domain}`,
          description: `「${Props.data.product.title}」のレビュー。レビューをチェックして、感想をシェアしよう。`,
          site_name: "MeruPlanet",
          url: `https://meruplanet.com/title/${Props.data.product.id}/reviews/${Props.data.review.id}`,
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
      <ProductReviews
        data={Props.data}
      />
    </>
  )
}

export default ReviewShow

ReviewShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <ProductShow
      // data = {Props.data}
      >
        <ProductShowReviews>
          {page}
        </ProductShowReviews>
      </ProductShow>   
    </ShareMain>
  )
}