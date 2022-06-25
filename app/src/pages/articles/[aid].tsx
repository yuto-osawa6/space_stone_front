import { Articles } from "@/components/articles/Articles"
import { ArticlesItem } from "@/components/articles/ArticlesItem"
import { ShareMain } from "@/components/share/main/ShareMain"
import { ProductShow } from "@/components/title/productShow"
import { ProductReviews } from "@/components/title/review/form/ProductReviews"
import { ProductThreads } from "@/components/title/thread/form/ProductThreads"
import { Article } from "@/interfaces/article"
import { ssr_url } from "@/lib/client/clientssr"
import { useLocale } from "@/lib/ini/local/local"
import { GetServerSideProps, GetStaticProps } from "next"
import { NextSeo } from "next-seo"
import nookies from "nookies"

export const getServerSideProps: GetServerSideProps = async(context) => {
  const cookies = nookies.get(context)
  const { aid } = context.query
  try{
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
    article:Article
  }
}
const ArticleShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const {t} = useLocale()
  return(
    <>
      <NextSeo
      title={`${Props.data.article.title}`}
      description = {``}
        openGraph={{
          type: "website",
          title: `${Props.data.article.title}`,
          description: ``,
          site_name: "MeruPlanet",
          url: `https://meruplanet.com/articles/${Props.data.article.id}`,
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
      ></NextSeo>
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
      // locationNumber={1}
    >
      <Articles>
        {page}
      </Articles>
    </ShareMain>
  )
}