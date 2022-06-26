
import { GridProductItem1 } from "@/components/share/component/GridProductItem1"
import { product } from "@/interfaces/product"
import { execGetUserTier, execPickUpMainHandler, execUpdateTierList } from "@/lib/api/mains/main_blocks"
import { useCallback, useEffect, useRef, useState } from "react"
import { IoChevronDownOutline } from "react-icons/io5"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { NextSeasonAnimeTier } from "./NextSeasonAnimeTier"


type Props =  {
  data:{
    currentSeason: string
    currentSeason2: string
    products: product[],
    products2: product[],
    scores: {avgScore:avgScore, avgScore2: avgScore}
  }
}
type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}
type TierProductGroup = {
  group:string
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
export const NextSeasonAnimeInfomation:React.FC<Props> = function NextSeasonAnimeInfomationFunc(Props){
  const ref = useRef<HTMLDivElement>(null!)
  const [left_grid,setLeft_grid] = useState<number[]>([])
  const [maxleft,setMaxLeft] = useState<number>(0)
  const [right,setRight] = useState<number>(0)
  const [products,setProducts] = useState<product[]>()
  const [products2,setProducts2] = useState<product[]>()
  const [currentSeason,setCurrentSeason] = useState<string>("")
  const [currentSeason2,setCurrentSeason2] = useState<string>("")
  const user = useSelector((state:RootState)=>state.user)
  const [avgScore,setAvgScore] = useState<avgScore>()
  const [avgScore2,setAvgScore2] = useState<avgScore>()
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
  let isMounted = true

  useEffect(()=>{
    setRight(ref.current.getBoundingClientRect().right)
  },[])

  const pushgridleft = useCallback(( flg:number )=> {
    setLeft_grid([...left_grid, left_grid.push(flg)]) ;
    setMaxLeft(Math.max(...left_grid))
  },[left_grid])
   // more action handler
  const [onMoreState,setOnMoreState] = useState<boolean>(false)
  const moreActionHandler = () => {
    onMoreState?setOnMoreState(false):setOnMoreState(true)
  }
  const [onMoreState2,setOnMoreState2] = useState<boolean>(false)
  const moreActionHandler2 = () => {
    onMoreState2?setOnMoreState2(false):setOnMoreState2(true)
  }
   // tier
  const [openTier,setOpenTier] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const handleOpenTierCreateModal = () =>  setOpenTier(true)
  const handleOpenSign = () => setOpen(true)
  // loginによる切り替え-------
  let isMounted2 = true
  const [userTier,setUserTier] = useState<UserTier[]>([])
  const handleGetUserTier = async()=>{
    const res = await execGetUserTier(user.user.id,2)
    if(res.status == 200){
      if(isMounted2){
        res.data.userTier.forEach((i:any)=>{
          const tier = i.tier
          if(0<=tier&&tier<=10){
            Object.assign(i,{group:5})
          }else if(10<tier&&tier<=30) {
            Object.assign(i,{group:4})
          }else if(30<tier&&tier<=50){
            Object.assign(i,{group:3})
          }else if(50<tier&&tier<=70){
            Object.assign(i,{group:2})
          }else if(70<tier&&tier<=90){
            Object.assign(i,{group:1})
          }else if(90<tier&&tier<=100){
            Object.assign(i,{group:0})
          }else{
          }
        })
        setUserTier(res.data.userTier)
      }
    }else{
    }
  }

  useEffect(()=>{
    if(user.login!=true)return
    const timer = setTimeout(() => {
      handleGetUserTier()
    }, 300)
    return () => {
      clearTimeout(timer)
      isMounted2 = false;
    };
  },[user.login])
  // ----------------------------------------------------------
  let isMounted3 = true
  const handleUpdateTierList = async() => {
    const res = await execUpdateTierList(user.user.id,2)
    if (res.status === 200){
      if(isMounted3){
        setUpSecond(res.data.tier,res.data.tierAverage)
        setUpdateTier(false)
      }
    }else{
    }
  }
  const [updateTier,setUpdateTier] = useState<boolean>(false)
  useEffect(()=>{
    if(updateTier==false)return
    handleGetUserTier()
    handleUpdateTierList()
    return () => {
      isMounted3 = false;
    };
  },[updateTier])
  // -------------------
  const [openTierUpdate,setOpenTierUpdate] = useState<boolean>(false)
  const handleOpenTierUpdateModal = () => {setOpenTierUpdate(true)
  }
  return(
    <>
    <div id = "last-season-a"
    style = {{
      backgroundColor: "aliceblue"
    }}
    >
    <div className = "NewNetflixContainer">
        <div className = "NewNetflixContainerRow">
          <div className = "NewNetflixContainerTitle share_middle_container_title">
            {/* doneyet-1 (前シーズンのアクセス情報が入ったら人気に変える) */}
            昨シーズンの作品 ({Props.data.currentSeason})
          </div>
        
          </div>
        <div className = {`NewNetflixContainerGrid ${onMoreState2?"moreActiveAction":""}`}
        ref={ref}
        >
          {Props.data.products!=undefined&&(
            <>
          {Props.data.products.map((item)=>{

            return(
              <GridProductItem1
                key={item.id}
                product={item}
                push ={ pushgridleft }
                left_grid = { maxleft}
                right = {right}
                avgScore = {avgScore!=undefined?avgScore[item.id]!=undefined?avgScore[item.id]:undefined:undefined}

              />
            )
          })}
          
          </>)}
        </div>
        <div className = "NewNetflixContainerRowAction share_middle_container_right_text"
        onClick={moreActionHandler2}
        >
          もっと見る<IoChevronDownOutline
          className = {onMoreState2?"addTitleOnTime":""}
          />
        </div>

      </div>
      </div>
      <NextSeasonAnimeTier
        products = {Props.data.products}
        currentSeason = {Props.data.currentSeason}
      />





      <div id = "next-season-a"
      style = {{
        backgroundColor: "aliceblue"
      }}
      >
      <div className = "NewNetflixContainer">
        <div className = "NewNetflixContainerRow">
          <div className = "NewNetflixContainerTitle share_middle_container_title">
            {/* doneyet-1 (前シーズンのアクセス情報が入ったら人気に変える) */}
            来シーズンの作品 ({Props.data.currentSeason2})
            
          </div>
        
          </div>
        <div className = {`NewNetflixContainerGrid ${onMoreState?"moreActiveAction":""}`}
        ref={ref}
        >
          {Props.data.products2!=undefined&&(
            <>
              {Props.data.products2.map((item)=>{

                return(
                  <GridProductItem1
                    key={item.id}
                    product={item}
                    push ={ pushgridleft }
                    left_grid = { maxleft}
                    right = {right}
                    avgScore = {avgScore2!=undefined?avgScore2[item.id]!=undefined?avgScore2[item.id]:undefined:undefined}
                  />
                )
              })}
            </>
          )}
        </div>
        <div className = "NewNetflixContainerRowAction share_middle_container_right_text"
        onClick={moreActionHandler}
        >
          もっと見る<IoChevronDownOutline
          className = {onMoreState?"addTitleOnTime":""}
          />
        </div>

      </div>
      </div>
    </>
  )
}