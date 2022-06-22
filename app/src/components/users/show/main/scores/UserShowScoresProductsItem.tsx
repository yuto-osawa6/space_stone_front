import { product } from "@/interfaces/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionSettingProductData2 } from "@/store/product/actions"

type Props = {
  product : product
  yourScores: score
  scoreIndex: number
}
type score = {
  all: number
  animation: number
  character: number
  id: number
  music: number
  performance: number
  productId: number
  userId: number
  value: number
  story: number
}

export const UserShowScoresProductsItem:React.FC<Props> = function UserShowScoresProductsItemFunc(Props){
  const [yourScore,setYourScore] = useState<number | undefined>(0)
  const handleYourScore = () => {
    switch(Props.scoreIndex){
      case 0:
        setYourScore(Props.yourScores.value)
        break
      case 1:
        setYourScore(Props.yourScores.all)
        break
      case 2:
        setYourScore(Props.yourScores.story)
        break
      case 3:
        setYourScore(Props.yourScores.animation)
        break
      case 4:
        setYourScore(Props.yourScores.performance)
        break
      case 5:
        setYourScore(Props.yourScores.music)
        break
      case 6:
        setYourScore(Props.yourScores.character)
        break
    }
  }

  useEffect(()=>{
    if(Props.yourScores==undefined)return
    handleYourScore()
  },[Props])
  const router = useRouter()
  const dispatch = useDispatch()
  const navigateHandler = () => {
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/title/${Props.product.id}`)
  }
  return(
    <>
      <div className = "UserShowLikesProductsItem"
      style={{cursor:"pointer"}}
      onClick={navigateHandler}
      >
        <img src={Props.product.imageUrl}/>
        <div className = "UserShowLikesProductsItemScore">
          {yourScore}
        </div>
      </div>
    </>
  )
}