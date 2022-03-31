// import { OpenContext } from "contexttype/contexttype"
import { useState } from "react"
import { useDispatch } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"
import { NavigatingLeftArticleDataAction } from "store/lefts/article/actions"
// import { ArticlesModal } from "./ArticlesModal"

export const LeftsArticles:React.FC = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const location = useLocation()

  const handleOpen = () => {

    if (location.pathname==="/articles"){
    dispatch(NavigatingLeftArticleDataAction(0))
    }else{
      dispatch(NavigatingLeftArticleDataAction(0))
      // navigate("/articles")
    }
  }
  const handleOpen2 = () => {
    if (location.pathname==="/articles"){
      dispatch(NavigatingLeftArticleDataAction(1))
    }else{
      dispatch(NavigatingLeftArticleDataAction(1))
      // navigate("/articles")
    }
  }
  return(
    <>
      <li
      onClick={
        handleOpen
        }
      >
        <a>週刊記事</a>
        
      </li>
      <li
        onClick={
        handleOpen2
        }
      >
        <a>月刊記事</a>
      </li>
    </>
  )
}