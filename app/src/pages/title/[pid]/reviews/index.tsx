import { Reviews } from "@/components/reviews/Reviews"
import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShowEpisords } from "@/components/title/episords/ProductShowEpisords"
import { ProductShow } from "@/components/title/productShow"
import { ProductShowReviews } from "@/components/title/review/ProductReviews"
import { productShow } from "@/interfaces/product"
import { ssr_url } from "@/lib/client/clientssr"
import { useLocale } from "@/lib/ini/local/local"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"
import nookies from 'nookies'

export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { pid } = context.query
  const params = {
    active:"1",
    last:"2"
  }
  const query_params = new URLSearchParams(params); 
  try {
    const [productShowRes] = await Promise.all([
      fetch(`${ssr_url}/products/${pid}/seo`,{
        headers:{
          "access-token": `${cookies._access_token}`,
          "client": `${cookies._client}`,
          "uid": `${cookies._uid}`
        }
      }), 
    ]);
   
    const [data] = await Promise.all([
      productShowRes.json()
    ]);
    if (data.status==200){
      return { 
        props: { 
          data
        } 
      };
    }else{
      return {notFound: true }
    }
  } catch (err) {
    return { notFound: true }
  }
}

type Props = {
  data:productShow
}


const TitleIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()
  return(
    <>
      <NextSeo
        title={`${Props.data.products.title} - ${t.domain}`}
      >
      </NextSeo>
      
    </>
  )
}

export default TitleIndex

TitleIndex.getLayout = (page) => {
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