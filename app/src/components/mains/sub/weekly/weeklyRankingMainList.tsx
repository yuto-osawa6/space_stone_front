import { product } from "@/interfaces/product"
import { useEffect, useState } from "react"
import { WeeklyRankingMainItems } from "./WeeklyRankingMainItems"
type Props = {
  week:weekly
}

type weekly = {
  id:number
  week:string
  products:product[]
}
export const WeekliyRankingsMainList:React.FC<Props> = function  WeekliyRankingsMainListFunc(Props){
  const [from,setFrom] = useState<string>("")
  const [to,setTo] = useState<string>("")
  const [allLength,setAllLength] = useState<number>(0)

  const handleSetup = () => {
    const from = new Date(Props.week.week) 
    const to = new Date(Props.week.week)
    from.setDate(from.getDate() + 7); 
    setTo(`${from.getMonth()+1}/${from.getDate()}`)
    setFrom(`${to.getMonth()+1}/${to.getDate()}`)
    const all = Props.week.products.reduce((sum,i)=>sum+i.productWeekly.filter(i=>(i.weekly!=undefined?new Date(i.weekly):new Date(2014)).getTime()==new Date(Props.week.week).getTime())[0].count,0)
    setAllLength(all)
  }

  useEffect(()=>{
    handleSetup()
  },[])
  return(
    <>
    <div className = "WeekliyRankings"
      >
        <div className="WeekliyRankingsTitle"
        style={{
          fontSize: "1.0rem",
          margin: "10px",
          display: "block",
          fontWeight: "bold"
        }}
        >
        （{from} ~ {to}）
        </div> 
            <ul
            style={{
              // paddingBottom: "30px",
              margin:"0px"
            }}
            >
              <li
              style={{
                padding: "10px",
                backgroundColor: "#2b878b",
                color: "white",
                fontSize: "0.8rem"
              }}
              
              >
              
              </li>
              {Props.week.products.map((item)=>{
                return(
                  <WeeklyRankingMainItems
                    key={item.id}
                    product = {item}
                    allLength = {allLength}
                    day = {Props.week.week}
                  />
                )
              })}
            </ul>
      </div>
    </>
  )
}