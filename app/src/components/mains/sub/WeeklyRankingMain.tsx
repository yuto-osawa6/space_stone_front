import { product } from "interfaces/product"
import { execWeekliyRankingsMain } from "lib/api/main"
import { useEffect, useState } from "react"
import { WeekliyRankingsMainList } from "./weekly/weeklyRankingMainList"
// import { WeekliyRankingsMainList } from "./weeklyRankingMainList"
// import { weeklyRankingMainList } from "./weeklyRankingMainList"

type weekly = {
  id:number
  week:string
  products:product[]
}

export const WeekliyRankingsMain:React.FC = () => {
  const [weekly,setWeekliy] = useState<weekly[]>([])
  // const 
  const handleFirst = async() => {
    const res = await execWeekliyRankingsMain()
    if(res.status == 200){
      console.log(res)
      setWeekliy(res.data.weekly)
    }else{

    }
  }
  useEffect(()=>{
    handleFirst()
  },[])

  // console.log(weekly)

  return(
    <>
      <div className="weeklyRankingMain"
      style={{margin:"20px"}}
      >
        <div className="weeklyRankingMainTitle"
          style={{
            fontSize: "1.2rem",
            fontWeight:"bold",
            marginBottom: "20px"
          }}
        >
          過去アンケート結果
        </div>
        <div className="weeklyRankingMainMain">
        {weekly.map((item)=>{
          return(
            <WeekliyRankingsMainList
              week = {item}
            />
          )
        })}
        </div>
      </div>
    </>
  )
}