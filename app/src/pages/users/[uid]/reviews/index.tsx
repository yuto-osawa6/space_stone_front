import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowLikesProducts } from "@/components/users/show/main/likes/UserShowLikesProducts"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserShowReviews } from "@/components/users/show/main/reviews/UserShowReviews"
import { UserShowScoresProducts } from "@/components/users/show/main/scores/UserShowScoresProducts"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"
import { NextSeo } from "next-seo"


type Props = {
  // data:productShow
}

const UserReviewShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  // const fallback= Props.fallback
  return(
    <>
      <NextSeo
      title={`レビュー - Userpage`}
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
      }}></NextSeo>
      {/* <UserShowReviews/> */}
    </>
  )
}

export default UserReviewShow

UserReviewShow.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={1}
    >
      <UsersShow>
        <UserShowReviews>
          {page}
        </UserShowReviews>
      </UsersShow>
    </ShareMain>
  )
}