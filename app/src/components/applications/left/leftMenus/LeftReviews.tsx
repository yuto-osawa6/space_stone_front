// import { OpenContext } from "contexttype/contexttype"
import { useState } from "react"
import { useDispatch } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"
import { NavigatingLeftReviewDataAction } from "store/lefts/review/actions"
// import { ArticlesModal } from "./ArticlesModal"

export const LeftsReviews:React.FC = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const location = useLocation()

  const handleOpen = () => {

    if (location.pathname==="/reviews"){
      dispatch(NavigatingLeftReviewDataAction(0))
    }else{
      dispatch(NavigatingLeftReviewDataAction(0))
      // navigate("/reviews")
    }
  }
  const handleOpen2 = () => {
    if (location.pathname==="/reviews"){
      dispatch(NavigatingLeftReviewDataAction(1))
    }else{
      dispatch(NavigatingLeftReviewDataAction(1))
      // navigate("/reviews")
    }
  }
  // const handleClose = () => setOpen(false);
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