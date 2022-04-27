import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { DeletingCastsDataAllAction } from "@/store/casts/actions"
import { DestroyTimeSearchAction } from "@/store/during/actions"
import { deletingtodoKisetsuDataAllAction } from "@/store/kisetsu/actions"
import { clearTitleAction } from "@/store/search/actions"
import { DestroySeasonSearchAction } from "@/store/season/actions"
import { deletingtodoStudiosDataALLAction } from "@/store/studios/actions"
import { AllDeleteSubClassAction } from "@/store/subsearches/actions"
import { deletingtodoGenresDataALLAction } from "@/store/todogenres/actions"
import { pussingtodoStylesDataAction } from "@/store/todostyles/actions"
import { DestroyYearSearchAction } from "@/store/year/actions"

type Props =  {
  id:number
  name:string
  count:number
}

const LeftStyle: React.FC<Props> = ({name,count,id}) =>{
  const dispatch = useDispatch()
  const router = useRouter()
  const clickHandler = (e:React.MouseEvent<HTMLLIElement>) => {
    dispatch(pussingtodoStylesDataAction(String(id)));
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(clearTitleAction())
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    dispatch(DestroyTimeSearchAction())
    dispatch(DestroyYearSearchAction())
    dispatch(DestroySeasonSearchAction())
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    router.push("/search")
  }

  return(
    <li className = "LeftFormatsList"
    onClick={clickHandler}
    >
      {name}
      <span>({count})</span>
    </li>
  )
}

export default LeftStyle 