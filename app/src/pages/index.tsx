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
  // const tierParams = {

  // }
  const query_params = new URLSearchParams(params); 
  const [thisSeasonRes, nextSeasonRes] = await Promise.all([
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/new_netflix`), 
    fetch(`${process.env.API_PATH_V1}/mainblocks/mains/pickup?`+ query_params)
    // fetch(`${process.env.ApiPathV1}/mainblocks/mains/update_tier_list?`+)
  ]);
  const [data, data2] = await Promise.all([
    thisSeasonRes.json(), 
    nextSeasonRes.json()
  ]);
  return { props: { data, data2 } };
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
  return(
    <>
      <ThisSeasonAnimeInfomation
        products = {Props.data.products}
        currentSeason = {Props.data.currentSeason}
      />
      <NextSeasonAnimeInfomation
        // products = {Props.data.products}
        // currentSeason = {Props.data.currentSeason}
        data = {Props.data2}
      />
      <Link href="/ota">
          <a>Home</a>
      </Link>
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