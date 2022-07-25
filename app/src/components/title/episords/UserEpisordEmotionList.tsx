import { userReview } from "@/interfaces/product"
type Props = {
  item: {
    id: number;
    emotion: string;
  }
}

export const UserEpisordEmotionList:React.FC<Props> = function UserEpisordEmotionListFunc(Props){
  return(
    <>
    <li
      style={{
        fontSize:"0.9rem"
      }}
      >
        {Props.item.emotion}
      </li>
    </>
  )
}