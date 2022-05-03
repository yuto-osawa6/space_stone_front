import { CreateTier } from "@/components/mains/tier/setup/CreateTier"
import { UpdateTier } from "@/components/mains/tier/setup/UpdateTier"
import { ThisMonthTierList } from "@/components/mains/tier/ThisMonthTierList"
import { product } from "@/interfaces/product"
import { execGetUserTier, execGetUserTier2 } from "@/lib/api/mains/main_blocks"
import { useUser } from "@/lib/data/user/useUser"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useSelector } from "react-redux"
// import { useLocation, useParams } from "react-router-dom"
import { RootState } from "@/store"
// import { CreateTier } from "../main_block/tier/CreateTier"
// import { ThisMonthTierList } from "../main_block/tier/thismonth/ThisMonthTierList"
// import { UpdateTier } from "../main_block/tier/UpdateTier"

type kisetsu = {
  id:number
  name:string
}

type year = {
  id:number
  year:string
}

type avg = {
  [k:number]:string
}

type yearTier = {
  avg: avg
  id: number
  kisetsu: kisetsu
  // products: tierProduct[]
  products:product[]
  year: year
}

type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
  tier:string
}

type TierProductGroup = {
  group:string
  // products:tierProduct[]
  products:product[]

}

type Props = {
  tiers: yearTier
  setUpdateTier: React.Dispatch<React.SetStateAction<boolean>>
  updateTier: boolean
}

type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
}

export const TierSeasonMainList:React.FC<Props> = function TierSeasonMainListFunc(Props){

  const [length,setLength] = useState<number>(0)
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

  const handleSetup = () =>{
     // tier
      // const result1 = res.data.tier.map(i=>Object.assign(i,res.data.tierAverage.tier.filter((k,v)=>k=i.id))
      Props.tiers.products.forEach((i:any)=>{
        const avg = Number(Props.tiers.avg[i.id])
       if(0<=avg&&avg<=10){
        Object.assign(i,{avg:Props.tiers.avg[i.id]},{tier:"E"})
       }else if(10<avg&&avg<=30) {
        Object.assign(i,{avg:Props.tiers.avg[i.id]},{tier:"D"})
       }else if(30<avg&&avg<=50){
        Object.assign(i,{avg:Props.tiers.avg[i.id]},{tier:"C"})
       }else if(50<avg&&avg<=70){
        Object.assign(i,{avg:Props.tiers.avg[i.id]},{tier:"B"})
      }else if(70<avg&&avg<=90){
        Object.assign(i,{avg:Props.tiers.avg[i.id]},{tier:"A"})
      }else if(90<avg&&avg<=100){
        Object.assign(i,{avg:Props.tiers.avg[i.id]},{tier:"S"})
      }  
    })
      // console.log(result)
      const copy = tierProductGroup.slice()
      copy[0] = {group:"S",products:Props.tiers.products.filter((i:any)=>i.tier=="S")}
      copy[1] = {group:"A",products:Props.tiers.products.filter((i:any)=>i.tier=="A")}
      copy[2] = {group:"B",products:Props.tiers.products.filter((i:any)=>i.tier=="B")}
      copy[3] = {group:"C",products:Props.tiers.products.filter((i:any)=>i.tier=="C")}
      copy[4] = {group:"D",products:Props.tiers.products.filter((i:any)=>i.tier=="D")}
      copy[5] = {group:"E",products:Props.tiers.products.filter((i:any)=>i.tier=="E")}
      // setTierProduct(res.data.tier)
      setTierProductGroup(copy)
      setLength(copy.map(i=>i.products).length)
  }

  useEffect(()=>{
    handleSetup()  
  },[Props.tiers])

  console.log(tierProductGroup)

  // mytier--------------------------------------------------------------------------------
  // const location = useLocation()
  // const params = useParams()
  const router = useRouter()
  const {uid} = router.query
  const user_id = uid as string
  const {userSwr} = useUser()
  const LoginUserStore = userSwr
  const handleDummyClick = () => {}
  const jsxHandleCreateTier = () => {
    if(location.pathname.match(/users/)){
      if(user_id==undefined) return
      return(
        <>
          {Number(user_id)==LoginUserStore.user.id&&(
            <>
              <div className=""
              onClick={Props.updateTier==false?handleClick:handleDummyClick}
              style={{
                cursor:"pointer",
                display:"flex",gap:"10px",margin:"0px 20px 20px 20px",fontSize: "0.8rem",color: "#01adff"
              }}
              >
                Tierを更新する
              </div>
            </>
          )}
        </>
      )
    }else{
      return(
      <>
      {LoginUserStore.login==true&&(
        <>
          <div className=""
          onClick={Props.updateTier==false?handleClick:handleDummyClick}
          style={{
            cursor:"pointer",
            display:"flex",gap:"10px",margin:"0px 20px 20px 20px",fontSize: "0.8rem",color: "#01adff"
          }}
          >
            Tierを更新する
          </div>
          </>
        )}
      </>
      )
    }
  }

  const handleClick = () => {
    handleGetUserTier()
  }

   // tier
   const [products, setProducts] = useState<product[]>()
   const [currentSeason,setCurrentSeason] = useState<string>("")
   const [tierProduct,setTierProduct] = useState<tierProduct>()
 
   const [userTier,setUserTier] = useState<UserTier[]>([])
   const handleGetUserTier = async()=>{
 
     const res = await execGetUserTier2(LoginUserStore.user.id,Props.tiers.year.id,Props.tiers.kisetsu.id)
     if(res.status == 200){
       setCurrentSeason(res.data.currentSeason)
       setProducts(res.data.products)
       console.log("aaaaaaaaaaaaaa")
       console.log(res)
 
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
       
      //  handleJudgeModal()
     }else{
 
     }
    
   }

   useEffect(()=>{
    if(products==undefined||products.length==0)return
    if(currentSeason=="")return
    handleJudgeModal()
   },[userTier])
   const  handleJudgeModal = () => {
      if(userTier.length>0){
        handleOpenTierUpdateModal()
      }else{
        handleOpenTierCreateModal()
      }
   }
    // tier create update
  const [openTier,setOpenTier] = useState<boolean>(false)
  const handleOpenTierCreateModal = () =>  setOpenTier(true)
  const [openTierUpdate,setOpenTierUpdate] = useState<boolean>(false)
  const handleOpenTierUpdateModal = () => {setOpenTierUpdate(true)}



  return(
    <>
      {length>0&&(
        <>
          <div className="">
            <div className=""
            style={{
              marginBottom: "5px",
              textAlign: "right"
            }}
            >
              {Props.tiers.year.year.slice(0,4)} {Props.tiers.kisetsu.name}
            </div>

            {jsxHandleCreateTier()}

            <div className=""
              style={{
                display: "grid",
                /* grid-template-columns: 1fr 1fr; */
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "10px",
                marginBottom: "30px"
              }}
            >
            
            {/* <> */}
              {tierProductGroup.map((item,index)=>{
                return(
                  <ThisMonthTierList
                    key = {index}
                    group = {item.group}
                    products = {item.products}
                  
                  />
                  )
              })}
            </div>
            

          </div>
        </>
      )}

        {openTier&&products!=undefined&&(
          <DndProvider backend={HTML5Backend}>
          <CreateTier
            products = {products}
            season = {currentSeason}
            open = {openTier}
            setOpen = {setOpenTier}
            setUpdateTier={Props.setUpdateTier}
          />
          </DndProvider>
        )}
        {openTierUpdate&&products!=undefined&&(
          <DndProvider backend={HTML5Backend}>
          <UpdateTier
            products = {products}
            season = {currentSeason}
            open = {openTierUpdate}
            setOpen = {setOpenTierUpdate}
            userTier = {userTier}
            setUpdateTier = {Props.setUpdateTier}
          />
          </DndProvider>
        )}
    </>
  )
}