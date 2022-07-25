import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { NavigatingLeftReviewDataAction } from "@/store/lefts/review/actions"
import { useLocale } from "@/lib/ini/local/local"

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
  }
  const handleOpen2 = () => {
    if (router.pathname==="/reviews"){
      dispatch(NavigatingLeftReviewDataAction(1))
    }else{
      dispatch(NavigatingLeftReviewDataAction(1))
      router.push("/reviews")
    }
  }
  const {t} = useLocale()
  return(
    <>
      <li
      onClick={
        handleOpen
        }
      >
        <a>{t.Component.Lefts.LIKE_REVIEW}</a> 
      </li>
      <li
        onClick={
        handleOpen2
        }
      >
        <a>{t.Component.Lefts.POPULAR_REVIEW}</a>
      </li>
    </>
  )
}