import { useEffect, useState } from "react"

type Props = {
  item: {
    id: number;
    emotion: string;
    // length:[{
    //   id:number
    //   productId:number
    // }]
    length:number
  }
  emotionListLength: number
}
type Color = {
  backgroundColor:string
}


export const EmotionItem:React.FC<Props> = (Props) => {

   const [emotionColor,setEmotionColor] = useState<Color>({backgroundColor:""})
  useEffect(()=>{
    const averageScore = Math.floor(Props.item.length/Props.emotionListLength*100)
    // if(averageScore==undefined)return
    if(averageScore<=10){
      setEmotionColor({backgroundColor:'rgb(246 61 32)'})
    }else if(10<averageScore&&averageScore<=20){
      setEmotionColor({backgroundColor:'rgb(255 106 0)'})
    }else if(20<averageScore&&averageScore<=30){
      setEmotionColor({backgroundColor:'rgb(255 165 0)'})
    }else if(30<averageScore&&averageScore<=40){
      setEmotionColor({backgroundColor:'rgb(138 212 43)'})
    }else if(40<averageScore&&averageScore<=50){
      setEmotionColor({backgroundColor:'rgb(0 198 152)'})
    }else if(50<averageScore&&averageScore<=60){
      setEmotionColor({backgroundColor:'rgb(0 173 255)'})
    }else if(60<averageScore&&averageScore<=70){
      setEmotionColor({backgroundColor:'rgb(0 102 255)'})
    }else if(70<averageScore&&averageScore<=80){
      setEmotionColor({backgroundColor:'rgb(110 0 255)'})
    }else if(80<averageScore&&averageScore<=90){
      setEmotionColor({backgroundColor:'rgb(239 0 255)'})
    }else if(90<averageScore&&averageScore<=100){
      setEmotionColor({backgroundColor:'rgb(255 48 115)'})
    }
  },[Props])
  return(
    <>
      <li style={emotionColor}>{Props.item.emotion} {Math.floor(Props.item.length/Props.emotionListLength*100)}%</li>
    </>
  )
}