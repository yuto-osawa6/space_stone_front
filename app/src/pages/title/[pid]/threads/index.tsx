import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShowEpisords } from "@/components/title/episords/ProductShowEpisords"
import { ProductShow } from "@/components/title/productShow"
import { ProductShowThreads } from "@/components/title/thread/ProductShowThread"
import { productShow } from "@/interfaces/product"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"

export const getServerSideProps: GetServerSideProps = async(context) => {
  const { pid } = context.query
  const params = {
    active:"1",
    last:"2"
  }
  const query_params = new URLSearchParams(params); 
  const [productShowRes] = await Promise.all([
    fetch(`${ssr_url}/products/${pid}/seo`), 
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
  data:productShow
}

const TitleIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <NextSeo
      title={`${Props.data.products.title} - SpaceTone`}
      //  description={Props.data.products.}
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
        <ProductShowThreads>
        {page}
        </ProductShowThreads>
      </ProductShow>   
    </ShareMain>
  )
}