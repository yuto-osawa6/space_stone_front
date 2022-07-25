import { tags } from "@/interfaces/main"
import { useDispatch } from "react-redux"
import { DeletingCastsDataAllAction } from "@/store/casts/actions"
import { DestroyTimeSearchAction } from "@/store/during/actions"
import { deletingtodoKisetsuDataAllAction, pussingtodoKisetsuDataAction } from "@/store/kisetsu/actions"
import { clearTitleAction } from "@/store/search/actions"
import { DestroySeasonSearchAction, SettingSeasonSearchAction } from "@/store/season/actions"
import { deletingtodoStudiosDataALLAction } from "@/store/studios/actions"
import { AllDeleteSubClassAction } from "@/store/subsearches/actions"
import { OpenCloseManagementSubSearchAction } from "@/store/subsearchopenmanagement/actions"
import { deletingtodoGenresDataALLAction } from "@/store/todogenres/actions"
import { deletingtodoStylesDataAllAction } from "@/store/todostyles/actions"
import { DestroyYearSearchAction, SettingYearSearchAction } from "@/store/year/actions"
import { useRouter } from "next/router"

type Props = {
  tag : tags
}
export const TagsGrid:React.FC<Props> = function TagsGridFunc(Props){
  const router = useRouter()
  const dispatch = useDispatch()
  const navigateYearHandler = () => {
    dispatch(SettingYearSearchAction(Props.tag.year,Props.tag.year))
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    dispatch(DestroyTimeSearchAction())
    dispatch(DestroySeasonSearchAction())
    // 2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    router.push('/search')
  }
  const navigateSeasonHandler = () => {
    dispatch(pussingtodoKisetsuDataAction(String(Props.tag.seasonId),Props.tag.kisetsu))
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    dispatch(DestroyTimeSearchAction())
    dispatch(DestroyYearSearchAction())
    dispatch(DestroySeasonSearchAction())
    // 2.0
    dispatch(deletingtodoStudiosDataALLAction())
    router.push('/search')
  }
  return(
    <>
      <div className="TagsGridContainer">
        {typeof Props.tag.year != "undefined"&&(
          <>
            <div className="TagsGridContainerYear"
            onClick={navigateYearHandler}
            >
              {Props.tag.year.slice(0,4)}
            </div>
          </>
        )}
        {typeof Props.tag.season != "undefined"&&(
          <>
            <div className="TagsGridContainerYear"
            onClick={navigateSeasonHandler}
            >
              {Props.tag.season}
            </div>
          </>
        )}
      </div>
    </>
  )
}