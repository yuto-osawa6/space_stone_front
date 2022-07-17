import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowLikesProducts } from "@/components/users/show/main/likes/UserShowLikesProducts"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserShowReviews } from "@/components/users/show/main/reviews/UserShowReviews"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"

import { UserShow } from "@/interfaces/user"
import { ssr_url } from "@/lib/client/clientssr"
import { GetServerSideProps } from "next"
import { NextSeo } from "next-seo"

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




const UserLikeShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  const url = Props.data.user.backgroundImage?Props.data.user.backgroundImage:"https://anime-tier.com/MeruPlanetOgp.png"
  return(
    <>
      <NextSeo
      title={`お気に入り - ${Props.data.user.nickname}さん`}
      description = {`${Props.data.user.nickname}さんのお気に入り。`}
      openGraph={{
        type: "website",
        title: "お気に入り",
        description: `${Props.data.user.nickname}さんのお気に入り。`,
        site_name: "アニメティア",
        url: `https://anime-tier.com/users/${Props.data.user.id}/likes`,
        images: [
          {
          // url: "https://www.example.ie/og-image-01.jpg",
            url: url,
            width: 1200,
            height: 630,
            alt: 'Og Image Alt',
            type: 'image/png',
          },
        ],
      }}>

      </NextSeo>
      <UserShowLikesProducts/>
    </>
  )
}

export default UserLikeShow

UserLikeShow.getLayout = (page) => {
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