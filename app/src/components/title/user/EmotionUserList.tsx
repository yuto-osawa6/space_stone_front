import { Productshowcontext } from "@/contexttype/contexttype"
import { useContext, useEffect, useState } from "react"
import { EmotionUserItem } from "./EmotionUserItem"

type emotions = {
  id:number
  emotion: string
  // length:number
}

type lengthK = {
  [k:number]:number
}

export const EmotionUserList:React.FC = function EmotionUserListFunc(){
  const props = useContext(Productshowcontext)  
  const [userEmotions,setUserEmotions] = useState<emotions[]>([])
  const [lengthK,setLengthK] = useState<lengthK>({0:0})
  const [allLength,setAllLength] = useState<number>(0)
  const handleSetup = () => {
    const emotions = props.userReviews.map(i=>i.emotions).flat()
    setAllLength(emotions.length)
    let length = emotions.reduce((pre:lengthK,cur)=>{
      pre[cur.id]=(pre[cur.id] || 0)+1
      return pre
    },{})
    setLengthK(length)
    emotions.sort((a,b)=>emotions.filter(i=>i.id===b.id).length - emotions.filter(i=>i.id===a.id).length)
    const result = getArrayDeleteDouble2(emotions,"id")
    setUserEmotions(result)
  } 
  const getArrayDeleteDouble2 = (ary:emotions[], key:any) => {
    let map = new Map(ary.map((o:any) => [o[key], o]));
    return Array.from(map.values());
  }

  

  useEffect(()=>{
    // if(Props.userReview!=)
    handleSetup()
  },[props.userReviews])

  return(
    <>
      <ul>
        {userEmotions.map((item)=>{
          return(
            <EmotionUserItem
              key = {item.id}
              item={item}
              itemLenth={lengthK[item.id]}
              emotionListLength={allLength}
            />
          )
        })}
      </ul>
    </>
  )
}