import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShowEpisords } from "@/components/title/episords/ProductShowEpisords"
import { Overview } from "@/components/title/overview/Overview"
import { ProductShow } from "@/components/title/productShow"
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
  const image_path = process.env.NODE_ENV == "production"? `https://api.meruplanet.com/api/v1/ogp_images/${Props.data.products.id}` : `http://localhost:3001/api/v1/ogp_images/${Props.data.products.id}`
  return(
    <>
      <NextSeo
      title={`${Props.data.products.title} - ${t.domain}`}
      description = {`${Props.data.products.title}に関するその他の情報を記載。`}
      openGraph={{
        type: "website",
        title: `OverView - ${Props.data.products.title}`,
        description: `${Props.data.products.title}に関するその他の情報を記載。`,
        site_name: "MeruPlanet",
        url: `https://meruplanet.com/title/${Props.data.products.id}/overview`,
        images: [
          {
          // url: "https://www.example.ie/og-image-01.jpg",
            url: image_path,
            width: 1200,
            height: 630,
            alt: 'Og Image Alt',
            type: 'image/png',
          },
        ],
      }}
      ></NextSeo>
      <Overview/>
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
      active={1}
      >
        {page}
      </ProductShow>   
    </ShareMain>
  )
}