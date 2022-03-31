// import { OpenContext } from "contexttype/contexttype"
import { useState } from "react"
import { useDispatch } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"
import { NavigatingLeftReviewDataAction } from "store/lefts/review/actions"
import { NavigatingLeftThreadDataAction } from "store/lefts/thread/actions"
// import { ArticlesModal } from "./ArticlesModal"

export const LeftsThreads:React.FC = () => {
  const dispatch = useDispatch()
  const handleOpen = () => {
    if (location.pathname==="/threads"){
      dispatch(NavigatingLeftThreadDataAction(0))
    }else{
      dispatch(NavigatingLeftThreadDataAction(0))
      // navigate("/threads")
    }
  }
  const handleOpen2 = () => {
    if (location.pathname==="/threads"){
      dispatch(NavigatingLeftThreadDataAction(1))
    }else{
      dispatch(NavigatingLeftThreadDataAction(1))
      // navigate("/threads")
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