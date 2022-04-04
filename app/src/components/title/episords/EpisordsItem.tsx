import { useEffect, useState } from "react"
import { EmotionList } from "./EmotionList";
import { userReview } from "interfaces/product";
import { UserEpisordEmotionList } from "./UserEpisordEmotionList";
import { useSelector } from "react-redux";
import { RootState } from "store";
type emotions = {
  id:number
  emotion: string
  length:number
}
type week = {
  array: weekly_rankings[]
  id: number
  week: string
}
type weekly_rankings = {
  count: number
  id: number
  productId: number
  weekId: number
  weekly: string
}

type Episords = {
  id: number
  arasuzi:string
  image:string
  releaseDate: string
  time: string
  title: string
  episord:number
  emotions:emotions[]
  weeks:week[]
}

type Props = {
  episord:Episords
  params_id: string | undefined
  userEmotion: userReview
}
export const EpisordsItem:React.FC<Props> = (Props) => {
  const[emotionListLength,setEmotionListLength] = useState<number>(0)
  const[emotions,setEmotions] = useState<emotions[]>([])
  const [count,setCount] = useState<number>(0)
  const [allCount,setAllCount] = useState<number>(0)
  const [rank,setRank] = useState<number>(0)

  const handleSetupEmotionList = () => {
    const result = Props.episord.emotions.length
    setEmotionListLength(result)
    let result2 = getArrayDeleteDouble2(Props.episord.emotions, "id");
    setEmotions(result2)
    if(Props.episord.weeks.length>0){
      if(Props.episord.weeks[0].array.filter(i=>String(i.productId)==Props.params_id as string).length!=0){
        setAllCount(Props.episord.weeks[0].array.reduce((sum,i)=>i.count+sum,0))
        setCount(Props.episord.weeks[0].array.filter(i=>String(i.productId)==Props.params_id as string)[0].count)
        if(Props.params_id==undefined)return
        // donyet-2(weeksが複数であるがエピソードは一回しか記録しないため0設定)
        setRank(Props.episord.weeks[0].array.sort((a,b)=>b.count - a.count).findIndex(i=>i.productId==Number(Props.params_id))+1)
      }
    }

  }
  useEffect(()=>{
    handleSetupEmotionList()
},[])

const getArrayDeleteDouble2 = (ary:emotions[], key:any) => {
  let map = new Map(ary.map((o:any) => [o[key], o]));
  return Array.from(map.values());
}

const LoginUser = useSelector((state:RootState)=>state.user)
  return(
    <>
    <div className=""
    style={{
      position:"relative",
      display: "flex",
      flexFlow: "column",
      gap: "10px",
      marginBottom:"20px",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "5px"
    }}
    >
      <div className=""
      style={{    
        display: "flex",
        gap: "10px",
        alignItems:"center"
      }}
      >
        <div className=""
        style={{
          fontWeight:"bold"
        }}
        >
          {Props.episord.episord}話
        </div>
        <div className="">
          {Props.episord.title}
        </div>
        <div className=""
        style={{
          fontSize:"0.9rem",
          color:"grey"
        }}
        >
          ({`${new Date(Props.episord.releaseDate).getFullYear()}/${new Date(Props.episord.releaseDate).getMonth()+1}/${new Date(Props.episord.releaseDate).getDate()}`})
        </div>
        <div className="">
        </div>      
      </div>

      {Props.episord.emotions.length>0&&(
        <ul className=""
        style={{
          display: "flex",
          gap: "10px",
          flexWrap:"wrap",
          paddingBottom:"10px",
          borderBottom:"1px solid",
          overflow:"scroll"
        }}
        >
          {emotions.map(item=>{
            return(
              <EmotionList
                key={item.id}
                emotion={item}
                emotionLength = {Props.episord.emotions.filter(i=>i.id==item.id).length}
                emotionAllLength = {emotionListLength}
              />
            )
          })}
        </ul>
      )}
      
      {Props.userEmotion!=undefined&&LoginUser.login==true&&(
        <ul className=""
          style={{
            display: "flex",
            gap: "10px",
            flexWrap:"wrap",
            paddingBottom:"10px",
            overflow:"scroll"
         }}
          >
          <li
          style={{fontSize:"0.9rem"}}
          >{LoginUser.user.nickname}さんが抱いた感情</li>
          {Props.userEmotion.emotions.map(item=>{
            return(
              <UserEpisordEmotionList
                key={item.id}
                item={item}
              />
            )
          })}
        </ul>
      )}

      {rank!=0&&count!=0&&(
        <div className=""
        style={{
          display: "flex",
          gap:"10px"
        }}
        >
          <div className="">
            アンケート結果
          </div>
          <div className="">ランクキング: {rank}</div>   
          <div className="">最も評価したと答えた人数: {count} ({Math.floor((count/allCount)*100)}%)</div> 
        </div>
      )}
      </div>
    </>
  )
}