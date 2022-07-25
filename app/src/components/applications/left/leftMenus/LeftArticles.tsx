import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { NavigatingLeftArticleDataAction } from "@/store/lefts/article/actions"
import { useLocale } from "@/lib/ini/local/local"

export const LeftsArticles:React.FC = function LeftsArticlesFunc(){
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
  const {t} = useLocale()
  return(
    <>
      <li
      onClick={
        handleOpen
        }
      >
        <a>{t.Component.Lefts.WEEKARTICLE}</a>
        
      </li>
      <li
        onClick={
        handleOpen2
        }
      >
        <a>{t.Component.Lefts.MONTHARTICLE}</a>
      </li>
    </>
  )
}