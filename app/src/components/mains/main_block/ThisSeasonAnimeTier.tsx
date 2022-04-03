import { UserModalSign } from "components/applications/user/UserModalSign"
import { OpenContext } from "contexttype/contexttype"
import { product } from "interfaces/product"
import { execGetThisSeasonTier, execGetUserTier } from "lib/api/mains/tier/tier"
import { useThisSeasonTier } from "lib/data/tier/thisSeasonTier"
import { useUser } from "lib/data/user/useUser"
import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import { ThisMonthTierList } from "../tier/ThisMonthTierList"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { CreateTier } from "../tier/setup/CreateTier"

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
export const ThisSeasonAnimeTier:React.FC<Props> = (Props) => {
  const {data} = useThisSeasonTier()
  // const { data } = useSWR<>('/mainblocks/mains/update_tier_list/1')
  console.log(data)
  // const { data } = useSWR('/mainblocks/mains/new_netflix')
  // const {tierData,error} = execGetThisSeasonTier()
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
    setUpSecond(data.tier,data.tierAverage)
  },[data])

  // console.log(tierData)
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
  // const [userTier,setUserTier] = useState<UserTier[]>([])
  const { userSwr } = useUser()
  const {userTier,error} = execGetUserTier(userSwr.user.id,1)
  console.log(userTier)
  useEffect(()=>{
    if(userSwr.login==false) return
    mutate('/mainblocks/mains/user_this_season_tier/1')
  },[userSwr.login])
  // const handleGetUserTier = async()=>{
  // const res = await execGetUserTier(user.user.id,1)
  //   if(res.status == 200){
  //     if(isMounted2==true){
  //       console.log(res)
  //       res.data.userTier.forEach((i:any)=>{
  //         const tier = i.tier
  //         if(0<=tier&&tier<=10){
  //         Object.assign(i,{group:5})
  //         }else if(10<tier&&tier<=30) {
  //         Object.assign(i,{group:4})
  //         }else if(30<tier&&tier<=50){
  //         Object.assign(i,{group:3})
  //         }else if(50<tier&&tier<=70){
  //         Object.assign(i,{group:2})
  //         }else if(70<tier&&tier<=90){
  //         Object.assign(i,{group:1})
  //         }else if(90<tier&&tier<=100){
  //         Object.assign(i,{group:0})
  //         }else{
  //         }
  //       })
  //       setUserTier(res.data.userTier)
  //     }else{}
  //   }else{
  //   }
  // }
  // useEffect(()=>{
  //   if(user.login!=true)return
  //   const timer = setTimeout(() => {
  //     handleGetUserTier()
  //   }, 250)
  //   return () => {
  //     clearTimeout(timer)
  //     isMounted2 = false;
  //   };
  // },[user.login])




  // --------------------------------------------------------------
  // let isMounted3 = true
  // const handleUpdateTierList = async() => {
  //   const res = await execUpdateTierList(user.user.id,1)
  //   if (res.status === 200){
  //     console.log(res)
  //     if(isMounted3){
  //       setUpSecond(res.data.tier,res.data.tierAverage)
  //       setUpdateTier(false)
  //     }
  //   }else{

  //   }
  // }
  // useEffect(()=>{
  //   if(updateTier===false)return
  //   handleGetUserTier()
  //   handleUpdateTierList()
  //   return () => {
  //     isMounted3 = false
  //   };
  // },[updateTier])
  // // --------------------------------------------------------------
  const [openTierUpdate,setOpenTierUpdate] = useState<boolean>(false)
  const handleOpenTierUpdateModal = () => {setOpenTierUpdate(true)
  }
  return(
    <>
      <div className=""
      style={{
      fontWeight:"bold",
      marginBottom: "10px",
      fontSize: "1.5rem"
      }}
      >
       今シーズンのTier
      </div>
      <div className=""
      style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "10px",
      marginBottom: "30px"
      }}
      >
        {tierProductGroup.map((item,index)=>{
          return(
          <ThisMonthTierList
          key={index}
          group = {item.group}
          products = {item.products}
          />
          )
        })}
      {Props.products!=undefined&&userTier!=undefined&&(
      <>
      {userTier.length==0&&(
      <div className=""
      onClick={userSwr.login==true?handleOpenTierCreateModal:handleOpenSign}
      style={{
        cursor:"pointer"
      }}
      >
        Tierを作成する
      </div>
      )}
      {userTier.length!=0&&(
      <div className=""
      onClick={userSwr.login==true?handleOpenTierUpdateModal:handleOpenSign}
      style={{
        cursor:"pointer"
      }}
      >
        Tierを更新する
      </div>
      )}
      {openTier&&(
      <DndProvider backend={HTML5Backend}>
        <CreateTier
        products = {Props.products}
        season = {Props.currentSeason}
        open = {openTier}
        setOpen = {setOpenTier}
        setUpdateTier={setUpdateTier}
        />
      </DndProvider>
      )}
      {/* {openTierUpdate&&(
      <DndProvider backend={HTML5Backend}>
        <UpdateTier
        products = {products}
        season = {currentSeason}
        open = {openTierUpdate}
        setOpen = {setOpenTierUpdate}
        userTier = {userTier}
        setUpdateTier={setUpdateTier}
        />
      </DndProvider>
      )} */}
      </>
      )}   
      {open&&(
      <OpenContext.Provider value={{ open, setOpen }}>
        <UserModalSign/>
      </OpenContext.Provider>
      )}  
      </div>
    </>
  )
}