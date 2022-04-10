import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ShareMain } from 'components/share/main/ShareMain'
// import { ShareMain } from 'src/components/share/main/ShareMain'
// import { ShareMain } from '../src/components/share/main/ShareMain'
import styles from 'styles/Home.module.scss'
import {BiTestTube} from 'react-icons/bi'
import { ThisSeasonAnimeInfomation } from 'components/mains/main_block/ThisSeasonAnimeInfomation'
import { product } from 'interfaces/product'
import handler from './api/hello'
import Link from 'next/link'
import { NextSeasonAnimeInfomation } from 'components/mains/main_block/NextSeasonAnimeInfomation'
import { SWRConfig } from 'swr'
import { ThisSeasonAnimeTier } from 'components/mains/main_block/ThisSeasonAnimeTier'
import { WorldClass } from 'components/mains/main_block/WordClass'
import { NewMessage } from 'components/mains/main_block/NewMessage'
import { CalendarProduct } from 'components/mains/main_block/Calendar'
import { Toptens2 } from 'components/mains/main_block/Toptens2'
import { Tags } from 'components/mains/main_block/Tags'
import { tags } from 'interfaces/main'


export const getServerSideProps: GetServerSideProps = async(context) => {
  // const res = await fetch(`${process.env.ApiPathV1}/mainblocks/mains/new_netflix`, {method: "GET"});
  // const json = await res.json();
  // return {
  //   props: {
  //     data: json
  //   },
  // };
  // console.log(context)
  const params = {
    active:"1",
    last:"2"
  }

  const tierParams = {
    current_number:"1"
  }
  const tierParams2 = {
    current_number:"2"
  }
  // const tierParams = {

  // }
  const query_params = new URLSearchParams(params); 
  const [thisSeasonRes, nextSeasonRes,tierRes,tierRes2,worldRes,calendarRes,tagsRes] = await Promise.all([
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/new_netflix`), 
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/pickup?`+ query_params),
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams)),
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams2)),
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/worldclass`),
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/calendar`),
    fetch(`${process.env.API_PATH_V1}/mains`),


  ]);
  const [data, data2,tierData,tierData2,worldData,calendarData,tagsData] = await Promise.all([
    thisSeasonRes.json(), 
    nextSeasonRes.json(),
    tierRes.json(),
    tierRes2.json(),
    worldRes.json(),
    calendarRes.json(),
    tagsRes.json()
  ]);
  return { 
    props: { 
      data, data2,worldData,calendarData,tagsData,
      fallback: {
        '/mainblocks/mains/update_tier_list/1': tierData,
        '/mainblocks/mains/update_tier_list/2' : tierData2
      }
    } 
  };
}

type Props = {
  data:{
    products: product[],
    currentSeason:string,
    scores:avgScore

  },
  data2:{
    currentSeason: string
    currentSeason2: string
    products: product[],
    products2: product[],
    scores: {avgScore:avgScore, avgScore2: avgScore}
    // tier: []
    // tier_average: 
  },
  worldData:{
    scores:avgScore
    worldRanking: product[]
  },
  calendarData:{
    deliveryStart: product[]
    episordStart: product[]
    scores:{
      avgScore:avgScore
    }
  },
  tagsData:{
    tags:tags[]
    top100:tags[]
  }
  ,
  fallback: {
    [key: string]: any;
  }
}
type avgScore = {
  [k:number]:string
}

type TierProductGroup = {
  group:string
  // products:tierProduct[]
  products:product[]
}
type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
}

 const Home: React.FC<Props>& { getLayout: (page: any) => JSX.Element }  = (Props) => {
  console.log(Props)
  const fallback= Props.fallback
  return(
    <>
    {/* <div className = "mainContents share_middle_container01"> */}
      <ThisSeasonAnimeInfomation
      products = {Props.data.products}
      currentSeason = {Props.data.currentSeason}
      />
      <SWRConfig value={{ fallback }}>
        <ThisSeasonAnimeTier 
        products = {Props.data.products}
        currentSeason = {Props.data.currentSeason}
        />


      <NextSeasonAnimeInfomation
      data = {Props.data2}
      />
      </SWRConfig>

      <WorldClass
      data = {Props.worldData}
      />

      <NewMessage
        // news = { decisionnews }
      />

      <CalendarProduct
       calendarData={Props.calendarData}
      />

      <Toptens2

      />

      <Tags
      tags = {Props.tagsData.tags}
      tagsTop100 = {Props.tagsData.top100}
      />
       

      {/* <SWRConfig value={{ fallback }}>
       <ThisSeasonAnimeTier 
        products = {Props.data.products}
        currentSeason = {Props.data.currentSeason}
       />
      </SWRConfig> */}
      <Link href="/ota">
          <a>Home</a>
      </Link>
      {/* </div> */}
    </>
  )
}

export default Home

// Home.getLayout = function getLayout(page) {
//   return (
//     <ShareMain>
//       {/* <NestedLayout>{page}</NestedLayout> */}
//       {page}
//     </ShareMain>
//   )
// }

Home.getLayout = (page) => {
  return (
    <ShareMain
      locationNumber={0}
    >
      <div className = "mainContents share_middle_container01">
        {page}
      </div>
    </ShareMain>
  )
}