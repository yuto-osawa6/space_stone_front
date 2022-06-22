import { tags } from "@/interfaces/main"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { SettingSortPeriodAction } from "@/store/sortperiod/actions"
import { useRouter } from "next/router"

type Props = {
  tag : tags
}
export const TagsTop100:React.FC<Props> = function TagsTop100Func(Props){
  const router = useRouter()
  const dispatch = useDispatch()

  const navigateToptenHandler = () => {
    dispatch(SettingSortPeriodAction(1,Props.tag.month,Props.tag.tagId))
    router.push('/top100')
  }

  return(
    <>
      <div className="TagsGridContainer">
        <>
          <div className="TagsGridContainerYear"
          onClick={navigateToptenHandler}
          >
            {Props.tag.tag}
            </div>
          </>
      </div>

    </>
  )
}