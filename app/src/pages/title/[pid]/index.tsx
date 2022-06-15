import MainSearch from "@/components/search/MainSearch"
import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { Top } from "@/components/title/top/Top"
import { productShow } from "@/interfaces/product"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps, NextPage } from "next"
import { NextSeo } from 'next-seo';

export const getServerSideProps: GetServerSideProps = async(context) => {
  const { pid } = context.query
  const params = {
    active:"1",
    last:"2"
  }
  const query_params = new URLSearchParams(params); 
  try {
    const [productShowRes] = await Promise.all([
      fetch(`${ssr_url}/products/${pid}/seo`), 
    ]);
    // console.log(productShowRes.status!=200)
    if (productShowRes.status==200){
    const [data] = await Promise.all([
      productShowRes.json()
    ]);
      return { 
        props: { 
          data
        } 
      };
    }else{
      console.log("エラーがおきました")
      return {notFound: true }
    }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}

type Props = {
  data:productShow
}

const TitleIndex: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
// const TitleIndex: NextPage<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  // const fallback= Props.fallback
  return(
    <>
      <NextSeo
       title={`${Props.data.products.title} - SpaceTone`}
      //  description={Props.data.products.}
      >
      </NextSeo>
      {/* <ProductShow
        // data={Props.data}
      > */}
        <Top/>
      {/* </ProductShow>    */}
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
      >
        {page}
      </ProductShow>   
    </ShareMain>
  )
}