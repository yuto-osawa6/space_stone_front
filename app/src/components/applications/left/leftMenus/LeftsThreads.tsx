import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { NavigatingLeftThreadDataAction } from "@/store/lefts/thread/actions"
import { useLocale } from "@/lib/ini/local/local"

export const LeftsThreads:React.FC = function LeftsThreadsFunc(){
  const dispatch = useDispatch()
  const router = useRouter()
  const handleOpen = () => {
    if (router.pathname==="/threads"){
      dispatch(NavigatingLeftThreadDataAction(0))
    }else{
      dispatch(NavigatingLeftThreadDataAction(0))
      router.push("/threads")
    }
  }
  const handleOpen2 = () => {
    if (router.pathname==="/threads"){
      dispatch(NavigatingLeftThreadDataAction(1))
    }else{
      dispatch(NavigatingLeftThreadDataAction(1))
      router.push("/threads")
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