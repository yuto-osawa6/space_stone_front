import { userReview } from "@/interfaces/product"

type Props = {
  item: {
    id: number;
    emotion: string;
}
// nickname: string
}

export const UserEpisordEmotionList:React.FC<Props> = (Props) => {
  
  console.log(Props)
  return(
    <>
     <li
      style={{
        // backgroundColor:emotionColor,
        // color:"white",
        // padding:"5px",
        // borderRadius:"5px",
        fontSize:"0.9rem"
      }}
      >
        {/* {Props.emotion.emotion} {Math.floor((Props.emotionLength/Props.emotionAllLength)*100)}% */}
         {Props.item.emotion}
      </li>
    </>
  )
}