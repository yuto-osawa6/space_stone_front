import { tags } from "@/interfaces/main"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { SettingSortPeriodAction } from "@/store/sortperiod/actions"
import { useRouter } from "next/router"

type Props = {
  tag : tags
}
export const TagsTop100:React.FC<Props> = function TagsTop100Func(Props){
  // const navigate = useNavigate()
  const router = useRouter()
  const dispatch = useDispatch()

  const navigateToptenHandler = () => {
    console.log(Props)
    dispatch(SettingSortPeriodAction(1,Props.tag.month,Props.tag.tagId))
    router.push('/top100')
    // navigate("/top100")
  }

  return(
    <>
      <div className="TagsGridContainer">
       
        {/* {typeof Props.tag.tag != "undefined"&&( */}
          <>
             <div className="TagsGridContainerYear"
             onClick={navigateToptenHandler}
             >
                {Props.tag.tag}
                {/* {Props.tag.tagId} */}
             </div>
          </>
        {/* )} */}

      </div>

    </>
  )
}