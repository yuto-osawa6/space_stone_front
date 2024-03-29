import { product } from "@/interfaces/product"
import { execWeeklyRanking } from "@/lib/api/mains/main_blocks"
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { WeeklyRankingItems } from "./weekly/WeeklyRankingItems"

type timeRange = {
  from:string
  to:string

}

type Props = {
  setl1: React.Dispatch<React.SetStateAction<boolean>>
}

export const WeeklyRanking:React.FC<Props> = memo(function WeeklyRankingFunc(Props){
  const [products,setProducts] = useState<product[]>([])
  const [timeRange,setTimeRange] = useState<timeRange>({
    from:"",
    to:""
  })
  const [weeklyVote,setWeeklyVote] = useState<boolean>(false)
  const [weeklyCount,setWeeklyCount] = useState<number>(0)
  let isMounted = true;
  const handlefirst = async() => {
    const res = await execWeeklyRanking()
    if(res.status == 200){
      if(isMounted==true){
        if(navigator.cookieEnabled == true){
          setWeeklyVote(res.data.weeklyVote)
        }else{
          setWeeklyVote(true)
        }
        setProducts(res.data.products)
        setWeeklyCount(res.data.weeklyCount)
        setTimeRange({from:`${new Date(res.data.from).getMonth()+1}月${new Date(res.data.from).getDate()}日`,to:`${new Date(res.data.to).getMonth()+1}月${new Date(res.data.to).getDate()}日`})
      }
    }else{
    }
    Props.setl1(true)
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      handlefirst()
    }, 300)
    return () => {
      clearTimeout(timer)
      isMounted = false;
    };
  },[])
  // ------------------------------------------------------------------------
  const ref1 = useRef<HTMLDivElement>(null)

  return(
    <>
      <div className = "WeekliyRankings"
      ref = {ref1}
      >
        <div className="WeekliyRankingsTitle"
        style={{
          // fontSize: "1.5rem",
          marginBottom: "20px",
          display: "block",
          fontWeight: "bold",
          padding: "0px 20px"
        }}
        >
          先週のエピソードアンケート（{timeRange.from} ~ {timeRange.to}）
        </div>  
        <ul
        >
          <li
            style={{
              padding: "10px 20px",
              backgroundColor: "#2b878b",
              color: "white",
              fontSize: "0.8rem"
            }}
          >
          {weeklyVote==true? "*投票、ありがとうございます。":"*先週放送されたエピソードの中で最も評価した作品の投票をお願いします。"}
          </li>
          {products.map((item)=>{
            return(
              <WeeklyRankingItems
              key={item.id}
              product = {item}
              setWeeklyVote = {setWeeklyVote}
              setProducts = {setProducts}
              setWeeklyCount = {setWeeklyCount}
              weeklyVote = {weeklyVote}
              weeklyCount = {weeklyCount}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
})