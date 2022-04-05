import { useEffect, useState } from "react"

type emotions = {
  id:number
  emotion: string
  length:number
}

type Props = {
  emotion: emotions
  emotionLength: number
  emotionAllLength: number
}

export const EmotionList:React.FC<Props> = (Props) => {

  const [emotionColor,setEmotionColor] = useState<string>("")
  useEffect(()=>{
    const averageScore = Math.floor((Props.emotionLength/Props.emotionAllLength)*100)
    if(averageScore<=10){
      setEmotionColor('rgb(246 61 32)')
    }else if(10<averageScore&&averageScore<=20){
      setEmotionColor('rgb(255 106 0)')
    }else if(20<averageScore&&averageScore<=30){
      setEmotionColor('rgb(255 165 0)')
    }else if(30<averageScore&&averageScore<=40){
      setEmotionColor('rgb(138 212 43)')
    }else if(40<averageScore&&averageScore<=50){
      setEmotionColor('rgb(0 198 152)')
    }else if(50<averageScore&&averageScore<=60){
      setEmotionColor('rgb(0 173 255)')
    }else if(60<averageScore&&averageScore<=70){
      setEmotionColor('rgb(0 102 255)')
    }else if(70<averageScore&&averageScore<=80){
      setEmotionColor('rgb(110 0 255)')
    }else if(80<averageScore&&averageScore<=90){
      setEmotionColor('rgb(239 0 255)')
    }else if(90<averageScore&&averageScore<=100){
      setEmotionColor('rgb(255 48 115)')
    }
  },[Props])
  return(
    <>
      <li
      style={{
        backgroundColor:emotionColor,
        color:"white",
        padding:"5px",
        borderRadius:"5px",
        fontSize:"0.9rem"
      }}
      >
        {Props.emotion.emotion} {Math.floor((Props.emotionLength/Props.emotionAllLength)*100)}%
      </li>
    </>
  )
}