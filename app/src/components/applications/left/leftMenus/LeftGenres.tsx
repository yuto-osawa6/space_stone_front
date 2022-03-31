import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { deletingtodoGenresDataExceptOneAction, pussingtodoGenresDataAction } from "store/todogenres/actions"
import { DeletingCastsDataAllAction } from "store/casts/actions"
import { DestroyTimeSearchAction } from "store/during/actions"
import { deletingtodoKisetsuDataAllAction } from "store/kisetsu/actions"
import { clearTitleAction } from "store/search/actions"
import { DestroySeasonSearchAction } from "store/season/actions"
import { deletingtodoStudiosDataALLAction } from "store/studios/actions"
import { AllDeleteSubClassAction } from "store/subsearches/actions"
import { deletingtodoGenresDataALLAction } from "store/todogenres/actions"
import { deletingtodoStylesDataAllAction, pussingtodoStylesDataAction } from "store/todostyles/actions"
import { DestroyYearSearchAction } from "store/year/actions"
type Props =  {
  id:number
  name:string
  count:number
}

const LeftGenre: React.FC<Props> = ({name,count,id}) =>{
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const clickHandler = (e:React.MouseEvent<HTMLLIElement>) => {
    dispatch(deletingtodoGenresDataExceptOneAction(String(id)));
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    dispatch(DestroyTimeSearchAction())
    dispatch(DestroyYearSearchAction())
    dispatch(DestroySeasonSearchAction())
    // 2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    // navigate("/search")
  }

  return(
    <li className="LeftFormatsList"
    onClick={clickHandler}
    >
      {name}
      <span>({count})</span>
    </li>
  )
}

export default LeftGenre