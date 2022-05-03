import { ThisMonthTierList } from "@/components/mains/tier/ThisMonthTierList"
import { product } from "@/interfaces/product"
import { UserShow } from "@/interfaces/user"
import { useEffect, useState } from "react"
// import { ThisMonthTierList } from "component/main/main_block/tier/thismonth/ThisMonthTierList"


type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
}

type Props = {
  user:UserShow
  // userTier: UserTier[]
}


type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}

type Group = {
  // products:tierProduct[]
  products:product[]
  group:string
  // tier:string
}
export const UserTierList2:React.FC<Props> = function UserTierList2Func(Props){
  console.log(Props)

  const [length,setLength] = useState<number>(0)
  const [tierProductGroup,setTierProductGroup] = useState<Group[]>([
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
    const copy = tierProductGroup.slice()
    copy[0] = {group:"S",products:Props.user.tier.filter(i=>i.tier==100).map(i=>i.product)}
    copy[1] = {group:"A",products:Props.user.tier.filter(i=>i.tier==80).map(i=>i.product)}
    copy[2] = {group:"B",products:Props.user.tier.filter(i=>i.tier==60).map(i=>i.product)}
    copy[3] = {group:"C",products:Props.user.tier.filter(i=>i.tier==40).map(i=>i.product)}
    copy[4] = {group:"D",products:Props.user.tier.filter(i=>i.tier==20).map(i=>i.product)}
    copy[5] = {group:"E",products:Props.user.tier.filter(i=>i.tier==0).map(i=>i.product)}

    // copy[0] = {group:"S",products:Props.userTier.filter(i=>i.tier==100).map(i=>i.product)}
    // copy[1] = {group:"A",products:Props.userTier.filter(i=>i.tier==80).map(i=>i.product)}
    // copy[2] = {group:"B",products:Props.userTier.filter(i=>i.tier==60).map(i=>i.product)}
    // copy[3] = {group:"C",products:Props.userTier.filter(i=>i.tier==40).map(i=>i.product)}
    // copy[4] = {group:"D",products:Props.userTier.filter(i=>i.tier==20).map(i=>i.product)}
    // copy[5] = {group:"E",products:Props.userTier.filter(i=>i.tier==0).map(i=>i.product)}
    setTierProductGroup(copy)
  }

  useEffect(()=>{
    handleSetup()  
  },[Props.user.tier])

  console.log(tierProductGroup)
  return(
    <>
    <div className=""
    style={{
      margin:"0px 20px 20px 20px",
      display: "grid",
      /* grid-template-columns: 1fr 1fr; */
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "10px",
      // marginBottom: "30px"
    }}
    >
      {tierProductGroup.map((item,index)=>{
        return(
          <ThisMonthTierList
            key={index}
            group={item.group}
            products={item.products}
          />
        )
      })}
      </div>
    </>
  )
}