import { product } from "@/interfaces/product"
import { execWeekliyRankingsMain } from "@/lib/api/main"
import { useEffect, useState } from "react"
import { WeekliyRankingsMainList } from "./weekly/weeklyRankingMainList"

type weekly = {
  id:number
  week:string
  products:product[]
}

export const WeekliyRankingsMain:React.FC = function WeekliyRankingsMainFunc(){
  const [weekly,setWeekliy] = useState<weekly[]>([])
  // const 
  const handleFirst = async() => {
    const res = await execWeekliyRankingsMain()
    if(res.status == 200){
      setWeekliy(res.data.weekly)
    }else{
    }
  }
  useEffect(()=>{
    handleFirst()
  },[])


  return(
    <>
      <div className="weeklyRankingMain"
      // style={{margin:"20px"}}
      >
        <div className="weeklyRankingMainTitle"
          style={{
            fontSize: "1.2rem",
            fontWeight:"bold",
            margin: "20px"
          }}
        >
          過去アンケート結果
        </div>
        <div className="weeklyRankingMainMain">
        {weekly.map((item)=>{
          return(
            <WeekliyRankingsMainList
              key = {item.id}
              week = {item}
            />
          )
        })}
        </div>
      </div>
    </>
  )
}