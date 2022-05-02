import { product } from "@/interfaces/product"
import { useEffect, useState } from "react"
import { WeeklyRankingMainItems } from "./WeeklyRankingMainItems"
// import { WeeklyRankingMainItems } from "./WeeklyRankingMainItems"
type Props = {
  week:weekly
}

type weekly = {
  id:number
  week:string
  products:product[]
}
export const WeekliyRankingsMainList:React.FC<Props> = function  WeekliyRankingsMainListFunc(Props){
  // console.log(Props)
  const [from,setFrom] = useState<string>("")
  const [to,setTo] = useState<string>("")
  const [allLength,setAllLength] = useState<number>(0)

  const handleSetup = () => {
    // Props.week
    const from = new Date(Props.week.week) 
    const to = new Date(Props.week.week)
    // console.log(new Date(Props.week.week))
    from.setDate(from.getDate() + 7); 
    console.log(from)
    console.log(to)
    setTo(`${from.getMonth()+1}/${from.getDate()}`)
    setFrom(`${to.getMonth()+1}/${to.getDate()}`)


    // console.log(Props.week.products.reduce((sum,i)=>sum+i.productWeekly.filter(i=>(i.weekly!=undefined?new Date(i.weekly):new Date(2014)).getTime()==new Date(Props.week.week).getTime())[0].count,0))
    const all = Props.week.products.reduce((sum,i)=>sum+i.productWeekly.filter(i=>(i.weekly!=undefined?new Date(i.weekly):new Date(2014)).getTime()==new Date(Props.week.week).getTime())[0].count,0)
    // console.log(Props.week.products.map(i=>i.productWeekly.filter(i=>(i.weekly!=undefined?new Date(i.weekly):new Date(2014)).getTime()==new Date(Props.week.week).getTime())[0].id))
    setAllLength(all)
  }

  useEffect(()=>{
    handleSetup()
  },[])
  // useStat

  return(
    <>
    <div className = "WeekliyRankings"
      >
        <div className="WeekliyRankingsTitle"
         style={{
          fontSize: "1.0rem",
          marginBottom: "10px",
          display: "block",
          fontWeight: "bold"
        }}
        >
        （{from} ~ {to}）
        </div> 
            <ul
            style={{
              paddingBottom: "30px"
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
                    // setWeeklyVote = {setWeeklyVote}
                    // setProducts = {setProducts}
                    // setWeeklyCount = {setWeeklyCount}
                    // weeklyVote = {weeklyVote}
                    // weeklyCount = {weeklyCount}
                  />
                )
              })}
            </ul>
      </div>
     
    </>
  )
}