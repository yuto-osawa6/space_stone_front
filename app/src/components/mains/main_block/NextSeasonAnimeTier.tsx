import { UserModalSign } from "@/components/applications/user/UserModalSign"
import { OpenContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import { useExecGetNextSeasonTier, useExecGetThisSeasonTier, useExecGetUserTier, useExecGetUserTier2 } from "@/lib/api/mains/tier/tier"
import { useNextSeasonTier, useThisSeasonTier } from "@/lib/data/tier/thisSeasonTier"
import { useUser } from "@/lib/data/user/useUser"
import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import { ThisMonthTierList } from "../tier/ThisMonthTierList"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { CreateTier } from "../tier/setup/CreateTier"
import { UpdateTier } from "../tier/setup/UpdateTier"
import {isMobile} from 'react-device-detect';
import { TouchBackend } from 'react-dnd-touch-backend'



type Props = {
  products: product[]
  currentSeason: string
}

type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
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

type avgScore = {
  [k:number]:string
}

type tierData = {

}
export const NextSeasonAnimeTier:React.FC<Props> = function NextSeasonAnimeTierFunc(Props){
  const {data} = useExecGetNextSeasonTier()
  const [avgScore,setAvgScore] = useState<avgScore>()
  const [tierProductGroup,setTierProductGroup] = useState<TierProductGroup[]>([
  {
    group:"S",
    products:[],
  },{
    group:"A",
    products:[],
  },{
    group:"B",
    products:[],
  },{
    group:"C",
    products:[],
  },{
    group:"D",
    products:[],
  },{
    group:"E",
    products:[],
  },
  ])

  useEffect(()=>{
    if(data==undefined)return
    if(data.tier==undefined)return
    setUpSecond(data.tier,data.tierAverage)
  },[data])
  const setUpSecond = (tiers:any,tierAvg:any) => {
    tiers.forEach((i:any)=>{
      const avg = Number(tierAvg.tierAvg[i.id])
      if(0<=avg&&avg<=10){
        Object.assign(i,{avg:tierAvg.tierAvg[i.id]},{tier:"E"})
      }else if(10<avg&&avg<=30) {
        Object.assign(i,{avg:tierAvg.tierAvg[i.id]},{tier:"D"})
      }else if(30<avg&&avg<=50){
        Object.assign(i,{avg:tierAvg.tierAvg[i.id]},{tier:"C"})
      }else if(50<avg&&avg<=70){
        Object.assign(i,{avg:tierAvg.tierAvg[i.id]},{tier:"B"})
      }else if(70<avg&&avg<=90){
        Object.assign(i,{avg:tierAvg.tierAvg[i.id]},{tier:"A"})
      }else if(90<avg&&avg<=100){
        Object.assign(i,{avg:tierAvg.tierAvg[i.id]},{tier:"S"})
      }  
      })
      const copy = tierProductGroup.slice()
      copy[0] = {group:"S",products:tiers.filter((i:any)=>i.tier=="S")}
      copy[1] = {group:"A",products:tiers.filter((i:any)=>i.tier=="A")}
      copy[2] = {group:"B",products:tiers.filter((i:any)=>i.tier=="B")}
      copy[3] = {group:"C",products:tiers.filter((i:any)=>i.tier=="C")}
      copy[4] = {group:"D",products:tiers.filter((i:any)=>i.tier=="D")}
      copy[5] = {group:"E",products:tiers.filter((i:any)=>i.tier=="E")}
      setTierProductGroup(copy)
      }



  // tier-------------------------------------------------
  const [openTier,setOpenTier] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const handleOpenTierCreateModal = () =>  setOpenTier(true)
  const handleOpenSign = () => setOpen(true)
  const [updateTier,setUpdateTier] = useState<boolean>(false)
  // loginによる切り替え-------------------------------------
  const { userSwr } = useUser()
  const {userTier,error} = useExecGetUserTier2(2)
  useEffect(()=>{
    if(userSwr.login==false) return
    mutate('/mainblocks/mains/user_this_season_tier/2')
  },[userSwr.login])
  // // --------------------------------------------------------------
  const [openTierUpdate,setOpenTierUpdate] = useState<boolean>(false)
  const handleOpenTierUpdateModal = () => {setOpenTierUpdate(true)
  }

  useEffect(()=>{
    if(updateTier===false)return
    mutate('/mainblocks/mains/update_tier_list/2')
    mutate('/mainblocks/mains/user_this_season_tier/2')
    setUpdateTier(false)
  },[updateTier])
  return(
    <>
      <div className="SeasonTier">
      <div className="SeasonTierTitle"
      style={{
      fontWeight:"bold",
      // marginBottom: "10px",
      // fontSize: "1.5rem",
      // paddingBottom: "10px"
      }}
      >
      昨シーズンのTier
      </div>
      <div className="ExplanatoryText">*ユーザーの投稿を集計した平均値で算出しております。</div>
      <div className="SeasonTierBox"
      style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "10px",
      // marginBottom: "30px"
      // padding: "0px 20px 20px 20px"
      }}
      >
        {tierProductGroup.map((item,index)=>{
          return(
          <ThisMonthTierList
          key={index}
          group = {item.group}
          products = {item.products}
          alice = {data.aliceT}
          />
          )
        })}
      {Props.products!=undefined&&userTier!=undefined&&(
      <>
      {userTier.length==0&&(
      <div className="editTierButton"
      onClick={userSwr.login==true?handleOpenTierCreateModal:handleOpenSign}
      style={{
        cursor:"pointer"
      }}
      >
        Tierを作成する
      </div>
      )}
      {userTier.length!=0&&(
      <div className="editTierButton"
      onClick={userSwr.login==true?handleOpenTierUpdateModal:handleOpenSign}
      style={{
        cursor:"pointer"
      }}
      >
        Tierを更新する
      </div>
      )}
      {openTier&&(
      <DndProvider backend={isMobile?TouchBackend:HTML5Backend}>
        <CreateTier
        products = {Props.products}
        season = {Props.currentSeason}
        open = {openTier}
        setOpen = {setOpenTier}
        setUpdateTier={setUpdateTier}
        />
      </DndProvider>
      )}
      {openTierUpdate&&(
      <DndProvider backend={isMobile?TouchBackend:HTML5Backend}>
        <UpdateTier
        products = {Props.products}
        season = {Props.currentSeason}
        open = {openTierUpdate}
        setOpen = {setOpenTierUpdate}
        userTier = {userTier}
        setUpdateTier={setUpdateTier}
        />
      </DndProvider>
      )}
      </>
      )}   
      {open&&(
      <OpenContext.Provider value={{ open, setOpen }}>
        <UserModalSign/>
      </OpenContext.Provider>
      )}  
      </div>
      </div>
    </>
  )
}