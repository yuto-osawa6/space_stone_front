import { ThisMonthTierList } from "@/components/mains/tier/ThisMonthTierList"
import { product } from "@/interfaces/product"
import { UserShow } from "@/interfaces/user"
import { useEffect, useState } from "react"

type UserTier = {
  group: number
  id: number
  product: product
  tier: number
  userId: number
  aliceT: number
}

type Props = {
  user?:UserShow
  userTier: UserTier[]
}

type Group = {
  products:product[]
  group:string
}
export const UserTierList:React.FC<Props> = function UserTierListFunc(Props){

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

    copy[0] = {group:"S",products:Props.userTier.filter(i=>i.tier==100).map(i=>i.product)}
    copy[1] = {group:"A",products:Props.userTier.filter(i=>i.tier==80).map(i=>i.product)}
    copy[2] = {group:"B",products:Props.userTier.filter(i=>i.tier==60).map(i=>i.product)}
    copy[3] = {group:"C",products:Props.userTier.filter(i=>i.tier==40).map(i=>i.product)}
    copy[4] = {group:"D",products:Props.userTier.filter(i=>i.tier==20).map(i=>i.product)}
    copy[5] = {group:"E",products:Props.userTier.filter(i=>i.tier==0).map(i=>i.product)}
    setTierProductGroup(copy)
  }

  useEffect(()=>{
    handleSetup()  
  },[Props.userTier])
  return(
    <>
    <div className=""
    style={{
      margin:"0px 20px 20px 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "10px",
    }}
    >
      {tierProductGroup.map((item,index)=>{
        return(
          <ThisMonthTierList
            key={index}
            group={item.group}
            products={item.products}
            alice = {Props.userTier.length>0?Props.userTier[0].aliceT:0}
          />
        )
      })}
      </div>
    </>
  )
}