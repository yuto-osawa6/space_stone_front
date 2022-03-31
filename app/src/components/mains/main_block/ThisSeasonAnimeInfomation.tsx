import { ThisSeasonProduct } from "api/Main/ThisSeasonSSR"
import { GridProductItem1 } from "components/share/component/GridProductItem1"
import { product } from "interfaces/product"
// import { execGetUserTier, execNewNetflixMainHandler, execUpdateTierList } from "lib/api/mains/main_blocks"
import { memo, useCallback, useEffect, useRef, useState } from "react"
// import { MdArrowDropDownCircle, MdOutlineKeyboardArrowDown } from "react-icons/md"
// import { MdKeyboardArrowDown } from "react-icons/md"
import { useSelector } from "react-redux"
import { RootState } from "store"
// import { BsArrowDownShort } from "react-icons/bs"
import { IoChevronDownOutline } from "react-icons/io5"
// import { MdKeyboardArrowDown } from "react-icons/md"
// import { GridProducts2 } from "./GridProducts2"
// import { CreateTier } from "./tier/CreateTier"
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'
// import { useSelector } from "react-redux"
// import { RootState } from "store"
// import { OpenContext } from "contexttype/contexttype"
// import { UserModalSign } from "component/aplication/lefts/UserModalSign"
// import { ThisMonthTierList } from "./tier/thismonth/ThisMonthTierList"
// import { UpdateTier } from "./tier/UpdateTier"

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

type Props = {
  products:product[]
  currentSeason: string
}

export const ThisSeasonAnimeInfomation:React.FC<Props> = memo((Props) => {
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
  // const setupHandler = async() => {
  //   if(isMounted==true){
  //   const res = await execNewNetflixMainHandler()

  //   if (res.status === 200){
  //     console.log(res)
  //     if(isMounted==true){
  //     setProducts(res.data.products)
  //     setCurrentSeason(res.data.currentSeason)
  //     setUpSecond(res.data.tier,res.data.tierAverage)
  //     setAvgScore(res.data.scores.avgScore)
  //     setRight(ref.current.getBoundingClientRect().right)
  //     }
  //   }else{
  //   }
  // }
  // }
  // 座標
  const [left_grid,setLeft_grid] = useState<number[]>([])
  const [maxleft,setMaxLeft] = useState<number>(0)
  const [right,setRight] = useState<number>(0)
  useEffect(()=>{
    setRight(ref.current.getBoundingClientRect().right)
    // const timer = setTimeout(() => {
    //   setupHandler()
  
    // }, 300)
    // return () => {
    //   clearTimeout(timer)
    //   isMounted = false;
    // };
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
  // loginによる切り替え-------------------------------------
  // const [userTier,setUserTier] = useState<UserTier[]>([])
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
        <div className = {`NewNetflixContainerGrid ${onMoreState?"moreActiveAction":""}`}
        ref={ref}
        >
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
        </div>
        <div className = "NewNetflixContainerRowAction share_middle_container_right_text"
        onClick={moreActionHandler}
        >
          もっと見る
          {/* <MdArrowDropDownCircle
          className = {onMoreState?"addTitleOnTime":""}
          /> */}
          <IoChevronDownOutline
            className = {onMoreState?"addTitleOnTime":""}
          />
        </div>
      </div>
      {/* <div className=""
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
      {products!=undefined&&(
      <>
      {userTier.length==0&&(
      <div className=""
      onClick={user.login==true?handleOpenTierCreateModal:handleOpenSign}
      style={{
        cursor:"pointer"
      }}
      >
        Tierを作成する
      </div>
      )}
      {userTier.length!=0&&(
      <div className=""
      onClick={user.login==true?handleOpenTierUpdateModal:handleOpenSign}
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
        products = {products}
        season = {currentSeason}
        open = {openTier}
        setOpen = {setOpenTier}
        setUpdateTier={setUpdateTier}
        />
      </DndProvider>
      )}
      {openTierUpdate&&(
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
      )}
      </>
      )}   
      {open&&(
      <OpenContext.Provider value={{ open, setOpen }}>
        <UserModalSign/>
      </OpenContext.Provider>
      )}  
      </div> */}
    </>
  )
})