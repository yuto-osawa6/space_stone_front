import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { NavigatingLeftArticleDataAction } from "store/lefts/article/actions"

export const LeftsArticles:React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleOpen = () => {
    if (router.pathname==="/articles"){
    dispatch(NavigatingLeftArticleDataAction(0))
    }else{
      dispatch(NavigatingLeftArticleDataAction(0))
      router.push("/articles")
    }
  }
  const handleOpen2 = () => {
    if (router.pathname==="/articles"){
      dispatch(NavigatingLeftArticleDataAction(1))
    }else{
      dispatch(NavigatingLeftArticleDataAction(1))
      router.push("/articles")
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