import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ShareMain } from '@/components/share/main/ShareMain'
import styles from 'styles/Home.module.scss'
import {BiTestTube} from 'react-icons/bi'
import { ThisSeasonAnimeInfomation } from '@/components/mains/main_block/ThisSeasonAnimeInfomation'
import { product } from '@/interfaces/product'
import handler from './api/hello'
import Link from 'next/link'
import { NextSeasonAnimeInfomation } from '@/components/mains/main_block/NextSeasonAnimeInfomation'
import { SWRConfig } from 'swr'
import { ThisSeasonAnimeTier } from '@/components/mains/main_block/ThisSeasonAnimeTier'
import { WorldClass } from '@/components/mains/main_block/WordClass'
import { NewMessage } from '@/components/mains/main_block/NewMessage'
import { CalendarProduct } from '@/components/mains/main_block/Calendar'
import { Toptens2 } from '@/components/mains/main_block/Toptens2'
import { Tags } from '@/components/mains/main_block/Tags'
import { tags } from '@/interfaces/main'
import { WeeklyRanking } from '@/components/mains/main_block/WeeklyRanking'
import { ssr_url } from '@/lib/client/clientssr'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { SubMenuAction } from '@/store/submenu/actions'
import Image from 'next/image'
import { useWindowDimensions } from '@/hook/useWindowResize'
import { Trend } from '@/components/mains/main_block/Trend'


export const getServerSideProps: GetServerSideProps = async(context) => {
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
  const query_params = new URLSearchParams(params); 
  // const [trendRes,thisSeasonRes, nextSeasonRes,tierRes,tierRes2,worldRes,calendarRes,tagsRes] = await Promise.all([
  const [trendRes,thisSeasonRes, nextSeasonRes,tierRes,tierRes2,worldRes,tagsRes] = await Promise.all([
    fetch(`${ssr_url}/mainblocks/mains/trend`), 
    fetch(`${ssr_url}/mainblocks/mains/new_netflix`), 
    fetch(`${ssr_url}/mainblocks/mains/pickup?`+ query_params),
    fetch(`${ssr_url}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams)),
    fetch(`${ssr_url}/mainblocks/mains/update_tier_list?`+ new URLSearchParams(tierParams2)),
    fetch(`${ssr_url}/mainblocks/mains/worldclass`),
    // fetch(`${ssr_url}/mainblocks/mains/calendar`),
    fetch(`${ssr_url}/mains`),


  ]);
  // const [trendData,data, data2,tierData,tierData2,worldData,calendarData,tagsData] = await Promise.all([
  const [trendData,data, data2,tierData,tierData2,worldData,tagsData] = await Promise.all([
    trendRes.json(),
    thisSeasonRes.json(), 
    nextSeasonRes.json(),
    tierRes.json(),
    tierRes2.json(),
    worldRes.json(),
    // calendarRes.json(),
    tagsRes.json()
  ]);
  return { 
    props: { 
      // trendData,data, data2,worldData,calendarData,tagsData,
      trendData,data, data2,worldData,tagsData,
      fallback: {
        '/mainblocks/mains/update_tier_list/1': tierData,
        '/mainblocks/mains/update_tier_list/2' : tierData2
      }
    } 
  };
}

type Props = {
  trendData:{
    products: product[],
    scores:avgScore
  },
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
  // calendarData:{
  //   deliveryStart: product[]
  //   episordStart: product[]
  //   scores:{
  //     avgScore:avgScore
  //   }
  // },
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
  const fallback= Props.fallback
  const submenu = useSelector((state:RootState)=>state.submenu)
  const dispatch = useDispatch()
   // location scroll-------------------------------
  //  const location = useLocation()
  const router = useRouter()
  const windowSize = useWindowDimensions()
  useEffect(()=>{
    // console.log(submenu)
    if(submenu.state==false)return
    if (router.asPath) {
      let elem = document.getElementById(`${router.asPath.slice(2)}-a`)
      // console.log(elem)
      if(elem==null)return
        const top = elem.getBoundingClientRect().top
      if (elem) {
        if(windowSize.width < 768){
          top<0?window.scrollTo({top:top + window.pageYOffset-78.8,left:0}):window.scrollTo({top:top + window.pageYOffset-78.8,left:0})
        }else{
        top<0?window.scrollTo({top:top + window.pageYOffset-79.8,left:0}):window.scrollTo({top:top + window.pageYOffset-29.8,left:0})
        }
      }
    } else {
    window.scrollTo({top:0,left:0})
    }
    dispatch(SubMenuAction(false))
  // },[router.asPath,])
},[submenu])
// console.log(Props.trendData)


  return(
    <>
    {/* <img src="/meruplanet.png" alt="me" width="64" height="64" /> */}
    {/* <div className = "mainContents share_middle_container01"> */}
      <div id="trend-a">
      <Trend
      products = {Props.trendData.products}
      />
      </div>
      <div id="weekly-ranking-a">
      <WeeklyRanking
      />
      </div>
      <SWRConfig value={{ fallback }}>
      <div className="SeasonGrid">
        <div id="this-season-a"
        >
        <ThisSeasonAnimeInfomation
        products = {Props.data.products}
        currentSeason = {Props.data.currentSeason}
        />
        </div>
        
          <ThisSeasonAnimeTier 
          products = {Props.data.products}
          currentSeason = {Props.data.currentSeason}
          />
      </div>

      <NextSeasonAnimeInfomation
      data = {Props.data2}
      />
      </SWRConfig>

      <div id="movies-a">
      <WorldClass
      data = {Props.worldData}
      />
      </div>

      <div id="news-a">
      <NewMessage
      />
      </div>

      {/* <CalendarProduct
       calendarData={Props.calendarData}
      /> */}

      <div id="toptens-a">
      <Toptens2

      />
      </div>

      
      <div id="tags-a">
      <Tags
      tags = {Props.tagsData.tags}
      tagsTop100 = {Props.tagsData.top100}
      />
      </div>
       

      {/* <SWRConfig value={{ fallback }}>
       <ThisSeasonAnimeTier 
        products = {Props.data.products}
        currentSeason = {Props.data.currentSeason}
       />
      </SWRConfig> */}
      {/* <Link href="/ota">
          <a>Home</a>
      </Link> */}
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
    <>
    {/* "aaaaa"
    あああ
    あああ
    あああ
    ああ
    あああ */}
    <ShareMain
      locationNumber={0}
    >
      <div className = "mainContents share_middle_container01">
        {page}
      </div>
    </ShareMain>
    </>
  )
}