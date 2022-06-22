import { product } from "@/interfaces/product"
import { memo, useEffect, useState } from "react"
import { TierProductList } from "./TierProductList"

type tierProduct = {
  id:number
  avg:string
  imageUrl:string
  title:string
}
type Props = {
  group: string
  products: product[]
}
export const ThisMonthTierList:React.FC<Props> = function ThisMonthTierListFunc(Props){
  const [color,setColor] = useState<string>()
  useEffect(()=>{
    switch (Props.group) {
      case "S":
        setColor('rgb(255 48 115)')
        break;
      case "A":
        setColor('rgb(110 0 255)')
        break;
      case "B":
        setColor('rgb(0 173 255)')
        break;
      case "C":
        setColor('rgb(0 198 152)')
        break;
      case "D":
        setColor('rgb(255 106 0)')
        break;
      case "E":
        setColor('rgb(26 37 47)')
        break;
      default:  
    }
  },[])
  return (
    <>
      <div className = "ThisMonthTierList"
      style={{
      overflow:"scroll"
      }}
      >
        <h2
          style={{
            width: "fit-content",
            zIndex: "10",
            position: "relative",
            left: "5px",
            color:"white",
            borderRadius:"5px",
            padding:"0px 5px 0px 5px",
            backgroundColor:color,
            fontWeight:"bold"
          }}
        >{Props.group}</h2>
        <div className=""
        style={{
        position:"relative"
        }}
        >
        <ul
          style={{
            width:"100%",
            minHeight:"97px",
            columnGap:"10px",
            rowGap:"10px",
            gap: "10px",
            top: "-10px",
            position: "relative",
            border: `1px solid ${color}`,
            borderRadius:"5px",
            padding:"10px",
            backgroundColor: color,
            overflow: "scroll",
            display: "flex",
            alignItems:"center"
          }}
        >
          {Props.products.map((item)=>{
            return(
            <TierProductList
            key={item.id}
            product={item}
            />  
            )
          })}
        </ul>
        <p
        style={{
          position: "absolute",
          top: "0",
          width: "11px",
          backgroundColor: color,
          height: "calc(100% - 10px)",
          borderRadius: "0px 0px 0px 5px",
          zIndex: "20"
          }}
        ></p>
        <p
        style={{
          position: "absolute",
          right:"0",
          top: "0",
          width: "11px",
          backgroundColor: color,
          height: "calc(100% - 10px)",
          borderRadius: "0px 0px 0px 5px",
          zIndex: "20"
          }}
        ></p>
        </div>
      </div>
    </>
  )
}