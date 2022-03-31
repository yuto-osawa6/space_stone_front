import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { NavigatingLeftThreadDataAction } from "store/lefts/thread/actions"

export const LeftsThreads:React.FC = () => {
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