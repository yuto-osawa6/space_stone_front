import { ShareMain } from "@/components/share/main/ShareMain"
import { UserShowOverview } from "@/components/users/show/main/overview/UserShowOverview"
import { UserOverviewTop } from "@/components/users/show/main/UserOverviewTop"
import { UsersShow } from "@/components/users/show/UsersShow"


type Props = {
  // data:productShow
}

const ArticleShow: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  return(
    <>
      {/* <NextSeo
        title={`ユーザーページ`}
        description = ""
        openGraph={{
          type: "website",
          title: "MeruPlanet",
          description: "",
          site_name: "MeruPlanet",
          url: "https://meruplanet.com/users",
          // images: [
          //   {
          //     url: "https://meruplanet.com/MeruPlanetOgp.png",
          //     width: 1200,
          //     height: 630,
          //     alt: 'Og Image Alt',
          //     type: 'image/png',
          //   },
          // ],
        }}
        // twitter={{
        //   handle: '@handle',
        //   site: '@site',
        //   cardType: 'summary_large_image',
        // }}
      ></NextSeo> */}
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