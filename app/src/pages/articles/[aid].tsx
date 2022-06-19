import { ArticlesItem } from "@/components/articles/ArticlesItem"
import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductThreads } from "@/components/title/thread/form/ProductThreads"
import { Article } from "@/interfaces/article"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps, GetStaticProps } from "next"
import nookies from "nookies"

export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { aid } = context.query
  try{
    // const query_params = new URLSearchParams(params); 
    const [res] = await Promise.all([
      fetch(`${ssr_url}/articles/${Number(aid as string)}`,{
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
    // console.log("a")
    // console.log(data)
    // console.log("a")
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
    article:Article
  }
}
const ArticleShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  // const fallback= Props.fallback
  return(
    <>
      <ArticlesItem
        data={Props.data}
      />
    </>
  )
}

export default ArticleShow

ArticleShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      {/* <ProductShow
      // data = {Props.data}
      > */}
        {page}
      {/* </ProductShow>    */}
    </ShareMain>
  )
}