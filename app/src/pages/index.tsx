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


export const getServerSideProps: GetServerSideProps = async(context) => {
  const res = await fetch(`${process.env.ApiPathV1}/mainblocks/mains/new_netflix`, {method: "GET"});
  const json = await res.json();
  return {
    props: {
      data: json
    },
  };
}

type Props = {
  data:{
    products: product[],
    current_season:string,
    scores:avgScore

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
      {/* <ShareMain> */}
        <ThisSeasonAnimeInfomation
          products = {Props.data.products}
          currentSeason = {Props.data.current_season}
        />
      {/* </ShareMain> */}
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
    <ShareMain>
      {page}
    </ShareMain>
  )
}