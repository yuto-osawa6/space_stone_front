import { product } from "@/interfaces/product"
import { useEffect, useState } from "react"

type Props = {
  product: product
  allLength: number
  day: string
}

type episords = {
  arasuzi: string
  episord: number
  id: number | null
  image: string
  season: number
  seasonTitle: string
  time: Date | undefined
  title: string
  releaseDate:string
}
export const WeeklyRankingMainItems:React.FC<Props> = function WeeklyRankingMainItemsFunc(Props){

  const [count,setCount] = useState<number>(0)
  const [persent,setPersent] = useState<string>("calc(100% - 0%)")
  const [persentTitle,setPersentTitle] = useState<string>("0")
  const [episords,setEpisords] = useState<episords[]>([])
  const handleSetUp = () => {
    const day = new Date(Props.day)
    const day2 = new Date(Props.day)
    day.setHours(6)
    day2.setDate(day2.getDate()+7)
    day2.setHours(6)
    const count = Props.product.productWeekly.filter(i=>(i.weekly!=undefined?new Date(i.weekly):new Date(2020)).getTime() == new Date(Props.day).getTime())
    const episord = Props.product.episords.filter(i=>new Date(i.releaseDate).getTime() > day.getTime() && new Date(i.releaseDate).getTime() < day2.getTime() )
    setEpisords(episord)
    setCount(count.length!=0?count[0].count:0)
    handleSecoundSetUp(count.length!=0?count[0].count:0)
  }
  const handleSecoundSetUp = (item:number) =>{
    const persent = (item / Props.allLength) * 100
    setPersent(`calc(100% - ${Math.floor(persent)}% `)
    setPersentTitle(persent.toFixed(1))
  }
  useEffect(()=>{
    handleSetUp()
  },[Props])

  return(
    <>
      <li
      className="WeeklyRankingList"
      style={{
        backgroundColor: "#0cbbc1",
        borderBottom: "1px dotted #0cbbc1",
        color: "#2c3e50",
        display: "grid",
        // gridTemplateColumns: "1fr 1fr"
      }}
      >
        <div className="WeeklyRankingItemsTitle"
        style={{
          padding:"10px",
          display: "flex",
          gap:"10px",
          alignItems: "center",
          backgroundColor: "white"
        }}
        >
          {Props.product.title}
          {episords.map((item,index)=>{
            return(
              <span className="weekyEpisords" key={index}>ep{item.episord}{index==0&&index==episords.length-1||index==episords.length-1?"":","}</span>
              
            )
          })}
        </div>
        <div className="WeeklyRankingItemsPersentageDummy"
        style={{
          position:"relative",
          backgroundColor: "#37d8b3",
          width:"100%"
        }}
        >
          <div className="WeeklyRankingItemsPersentage"
            style={{
              position: "absolute",
              left: "0",
              backgroundColor: "#0dbbc1",
              transition: "1s",
              height: "100%",
              width:persent
            }
          }
          >
             {/* 投票 */}
          </div>
          <div className="WeeklyRankingItemsPersentageTitle"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)"
          }}
          >
            {`${persentTitle}%`}
          </div>
        </div>
      </li>
    </>
  )
}