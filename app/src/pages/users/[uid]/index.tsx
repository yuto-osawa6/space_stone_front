import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"
import { useLocale } from "@/lib/ini/local/local"
import { NextSeo } from "next-seo"


import { UserShow } from "@/interfaces/user"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async(context) => {
  // const cookies = nookies.get(context)
  const { uid } = context.query

  try {
    const [productShowRes] = await Promise.all([
      fetch(`${ssr_url}/users/${uid}/seo`,{
        // headers:{
        //   "access-token": `${cookies._access_token}`,
        //   "client": `${cookies._client}`,
        //   "uid": `${cookies._uid}`
        // }
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
  data:{
    user:UserShow
  }
}

const ArticleShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const url = Props.data.user.backgroundImage?Props.data.user.backgroundImage:"https://anime-tier.com/MeruPlanetOgp.png"
  const {t} = useLocale()
  return(
    <>
      <NextSeo
        title={`${Props.data.user.nickname}さんのMypage - ${t.domain}`}
        description = "${Props.data.user.nickname}さんのマイページです。お気に入り、ティア、評価などチェックしよう！。"
        openGraph={{
          type: "website",
          title: `${Props.data.user.nickname}さんのMypage`,
          description: `${Props.data.user.nickname}さんのマイページです。お気に入り、ティア、評価などチェックしよう！。`,
          site_name: "アニメティア",
          url: "https://anime-tier.com/users",
          images: [
            {
              url: url,
              width: 1200,
              height: 630,
              alt: 'Og Image Alt',
              type: 'image/png',
            },
          ],
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo>
      <UserShowOverview/>
    </>
  )
}

export default ArticleShow

ArticleShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <UsersShow>
        {page}
      </UsersShow>
    </ShareMain>
  )
}