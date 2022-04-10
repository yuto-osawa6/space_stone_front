import { product } from "interfaces/product"
import { execVoteWeeklyRanking } from "lib/api/mains/main_blocks"
import { memo, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { pussingMessageDataAction } from "store/message/actions"

type Props = {
  product: product
  setWeeklyVote: React.Dispatch<React.SetStateAction<boolean>>
  setProducts: React.Dispatch<React.SetStateAction<product[]>>
  setWeeklyCount: React.Dispatch<React.SetStateAction<number>>
  weeklyVote: boolean
  weeklyCount: number
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

export const WeeklyRankingItems:React.FC<Props> = memo((Props) => {
  const [count,setCount] = useState<number>(0)
  const [persent,setPersent] = useState<string>("calc(100% - 0%)")
  const [persentTitle,setPersentTitle] = useState<string>("0")
  const [episordIds,setEpisordIds] = useState<number[]>([])
  const [episords,setEpisords] = useState<episords[]>([])

  const handleCalcDate = () => {
    const curr = new Date();
    const curr2 = new Date();
    if(curr.getDay()==1&&curr.getHours()<6){
      const first = curr.getDate() - curr.getDay() - 20
      var startDate = new Date(curr.setDate(first));
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      startDate.setMilliseconds(0)
      var episordStartWeek = new Date(startDate)
      var episordEndWeek = new Date(startDate)
      episordStartWeek.setHours(6)
      episordEndWeek.setHours(6)
      episordEndWeek.setDate(episordEndWeek.getDate() + 7)
    }else{
      const first = curr.getDate() - curr.getDay() - 13
      var startDate = new Date(curr.setDate(first));
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      startDate.setMilliseconds(0)
      var episordStartWeek = new Date(startDate)
      var episordEndWeek = new Date(startDate)
      episordStartWeek.setHours(6)
      episordEndWeek.setHours(6)
      episordEndWeek.setDate(episordEndWeek.getDate() + 7)
    }
    return {startDate,episordStartWeek,episordEndWeek}
  }
  
  const handleSetUp = () => {
    let {startDate,episordStartWeek,episordEndWeek} = handleCalcDate() 
    const count = Props.product.productWeekly.filter(i=>(i.weekly!=undefined?new Date(i.weekly):new Date(2020)).getTime() == startDate.getTime())
    const episord = Props.product.episords.filter(i=>new Date(i.releaseDate).getTime() > episordStartWeek.getTime() && new Date(i.releaseDate).getTime() < episordEndWeek.getTime())
    setEpisords(episord)
    setEpisordIds(episord.map(i=>i.id as number))
    if(Props.weeklyVote==false)return
    setCount(count.length!=0?count[0].count:0)
    handleSecoundSetUp(count.length!=0?count[0].count:0)
  }
  const handleSecoundSetUp = (item:number) =>{
    const persent = (item / Props.weeklyCount) * 100
    setPersent(`calc(100% - ${Math.floor(persent)}% `)
    setPersentTitle(persent.toFixed(1))
  }

  useEffect(()=>{
    handleSetUp()
  },[Props])


  // -------------------------------------------------------------------------------------------
  const dispatch = useDispatch()
  const handleVoteWeeklyRanking = async() => {
    const res = await execVoteWeeklyRanking(Props.product.id,episordIds)
    if(res.data.status === 200){
      console.log(res)
      Props.setProducts(res.data.products)
      Props.setWeeklyCount(res.data.weeklyCount)
      Props.setWeeklyVote(res.data.weeklyVote)
    }else if(res.data.status === 500){
      dispatch(pussingMessageDataAction(res.data.message))
    }else{
      dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
    }
  }
  const nocontroller = () => {}
  return(
    <>
      <li
      style={{
        backgroundColor: "#0cbbc1",
        borderBottom: "1px dotted #0cbbc1",
        color: "#2c3e50",
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}
      >
        <div className="WeeklyRankingItemsTitle"
        style={{
          padding:"10px",
          display: "flex",
          gap:"20px",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white"
        }}
        >
          <div className=""
          style={{
            gap: "10px",
            display:"flex"
          }}
          >
            {Props.product.title}
            {episords.map((item,index)=>{
              return(
                <span className="weekyEpisords" key={item.id}>ep{item.episord}{index==0&&index==episords.length-1||index==episords.length-1?"":","}</span>
              )
            })}
          </div>
          <div className="InvoteButtonWeekly"
            onClick={Props.weeklyVote==false?handleVoteWeeklyRanking:nocontroller}
            style={Props.weeklyVote==false?{
              backgroundColor: "#edf1f5",
              cursor:"pointer",
              fontSize: "0.9rem"
            }:{
              cursor: "default",
              opacity:0,
              fontSize: "0.9rem"
            }}
          >
            投票
          </div>     
        </div>
        <div className="WeeklyRankingItemsPersentageDummy"
        style={{
          position:"relative",
          backgroundColor: "#37d8b3",
          width:"100%"
        }}
        >
          <div className="WeeklyRankingItemsPersentage"
            style={Props.weeklyVote==false?{
              position: "absolute",
              left: "0",
              backgroundColor: "#0dbbc1",
              transition: "1s",
              height: "100%",
              width:"0%"
            }:{
              position: "absolute",
              left: "0",
              backgroundColor: "#0dbbc1",
              transition: "1s",
              height: "100%",
              width:persent
            }
          }
           >
          </div>
          <div className="WeeklyRankingItemsPersentageTitle"
           style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)"
          }}
          >
            {Props.weeklyVote==true?`${persentTitle}%`:""}
          </div>
        </div>
      </li>
    </>
  )
})