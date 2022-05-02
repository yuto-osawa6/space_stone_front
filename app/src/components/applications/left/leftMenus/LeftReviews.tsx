import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { NavigatingLeftReviewDataAction } from "@/store/lefts/review/actions"

export const LeftsReviews:React.FC = function LeftsReviewsFunc(){
  const dispatch = useDispatch()
  const router = useRouter()

  const handleOpen = () => {

    if (router.pathname==="/reviews"){
      dispatch(NavigatingLeftReviewDataAction(0))
    }else{
      dispatch(NavigatingLeftReviewDataAction(0))
      router.push("/reviews")
    }
    // router.push("/ota")
  }
  const handleOpen2 = () => {
    if (router.pathname==="/reviews"){
      dispatch(NavigatingLeftReviewDataAction(1))
    }else{
      dispatch(NavigatingLeftReviewDataAction(1))
      router.push("/reviews")
    }
    // router.push("/")
  }
  return(
    <>
      <li
      onClick={
        handleOpen
        }
      >
        <a>好評価率の高い</a> 
      </li>
      <li
        onClick={
        handleOpen2
        }
      >
        <a>流行している</a>
      </li>
    </>
  )
}