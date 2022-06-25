import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowLikesProducts } from "@/components/users/show/main/likes/UserShowLikesProducts"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserShowReviews } from "@/components/users/show/main/reviews/UserShowReviews"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"
import { NextSeo } from "next-seo"


type Props = {
}

const UserLikeShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  return(
    <>
      <NextSeo
      title={`お気に入り - Userpage`}
      description = {``}
      openGraph={{
        type: "website",
        title: "MeruPlanet",
        description: ``,
        site_name: "MeruPlanet",
        // url: `https://meruplanet.com/`,
        // images: [
        //   {
        //   // url: "https://www.example.ie/og-image-01.jpg",
        //     url: image_path,
        //     width: 1200,
        //     height: 630,
        //     alt: 'Og Image Alt',
        //     type: 'image/png',
        //   },
        // ],
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