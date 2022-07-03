import { GridProductItem1 } from "@/components/share/component/GridProductItem1"
import { product } from "@/interfaces/product"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { IoChevronDownOutline } from "react-icons/io5"
import { mutate } from "swr"


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

type Props = {
  products:product[]
  currentSeason: string
}

export const ThisSeasonAnimeInfomation:React.FC<Props> = memo(function ThisSeasonAnimeInfomationFunc(Props){
  const ref = useRef<HTMLDivElement>(null!)
  const [products, setProducts] = useState<product[]>()
  const [currentSeason,setCurrentSeason] = useState<string>("")
  const user = useSelector((state:RootState)=>state.user)
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

  let isMounted = true;
  let isMounted2 = true;

  // 座標
  const [left_grid,setLeft_grid] = useState<number[]>([])
  const [maxleft,setMaxLeft] = useState<number>(0)
  const [right,setRight] = useState<number>(0)
  useEffect(()=>{
    setRight(ref.current.getBoundingClientRect().right)
  },[])
  const pushgridleft = useCallback(( flg:number )=> {
    setLeft_grid([...left_grid, left_grid.push(flg)]) ;
    setMaxLeft(Math.max(...left_grid))
  },[left_grid])
  const [onMoreState,setOnMoreState] = useState<boolean>(false)
  const moreActionHandler = () => {
  onMoreState?setOnMoreState(false):setOnMoreState(true)
  }
  // tier-------------------------------------------------
  const [openTier,setOpenTier] = useState<boolean>(false)
  const [open,setOpen] = useState<boolean>(false)
  const handleOpenTierCreateModal = () =>  setOpenTier(true)
  const handleOpenSign = () => setOpen(true)
  const [updateTier,setUpdateTier] = useState<boolean>(false)

  // --------------------------------------------------------------
  const [openTierUpdate,setOpenTierUpdate] = useState<boolean>(false)
  const handleOpenTierUpdateModal = () => {setOpenTierUpdate(true)
  }
  return(
    <>
      <div className = "NewNetflixContainer">
        <div className = "NewNetflixContainerRow">
          <div className = "NewNetflixContainerTitle share_middle_container_title concept">
            今シーズン人気作品({Props.currentSeason})
          </div>
        </div>
        <div className="MeruplanetGridContainerTitles">
        <div className = {`NewNetflixContainerGrid ${onMoreState?"moreActiveAction":""}`}
        ref={ref}
        >
          {Props.products!=undefined&&(
            <>
              {Props.products.map((item)=>{
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
            </>
          )}
        </div>
        <div className = "NewNetflixContainerRowAction share_middle_container_right_text"
        onClick={moreActionHandler}
        >
          もっと見る
          <IoChevronDownOutline
            className = {onMoreState?"addTitleOnTime":""}
          />
        </div>
        </div>
      </div>
    </>
  )
})