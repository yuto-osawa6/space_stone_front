import React, {useEffect,useRef,useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addTodoAction, clearTitleAction } from '@/store/search/actions';
import { GenresSearch } from "./GenresSearch";
import { IoSearchCircle } from 'react-icons/io5'
import { FaTags,FaSort } from 'react-icons/fa'
import { Styles } from "./Styles";
import { deletingtodoGenresDataALLAction, deletingtodoGenresDataExceptOneAction} from "@/store/todogenres/actions";
import { deletingtodoStylesDataAllAction } from "@/store/todostyles/actions";
import {SortLists} from "./SortLists"
import { GridStyles } from "./GridStyles";
import { CastsSearch } from "./add/cast/CastsSearch";
import { DeletingCastsDataAllAction, DeletingCastsDataExceptOneAction } from "@/store/casts/actions";
import { Cast } from "@/interfaces/search";
import { MdMenuOpen } from "react-icons/md"
import { SubSearches } from "./SubSearches";
import { AllDeleteSubClassAction, DeilyEndQteQAction, DeilyStartQteQAction, SubPickupSearchAction } from "@/store/subsearches/actions";
import { DestroyTimeSearchAction } from "@/store/during/actions";
import { DestroySeasonSearchAction } from "@/store/season/actions";
import { DestroyYearSearchAction } from "@/store/year/actions";
import { OpenCloseManagementSubSearchAction } from "@/store/subsearchopenmanagement/actions";
import { StudioSearch} from "./studio/StudioSearch" 
import { SeasonSearch } from "./season/SeasonSearch";
import { YearSearch } from "./year/YearSearch";
import { deletingtodoStudiosDataALLAction, deletingtodoStudiosDataExceptOneAction } from "@/store/studios/actions";
import { deletingtodoKisetsuDataAllAction } from "@/store/kisetsu/actions";
import { UserSearchModal } from "./user_search/UserSearchModal";
import { useRouter } from "next/router";
import { execDataInfo } from "@/lib/api/admin/data-info";

interface SearchData {
  title_or_titleKa_or_titleEn_or_titleRo_cont: string,
  quicked:boolean,
}
const initialData: SearchData = {
  title_or_titleKa_or_titleEn_or_titleRo_cont:"",
  quicked:false
}
type Studios = {
  id:number
  company:string
}
const Search:React.FC = function SearchFunc(){
  const [data, setData] = useState<SearchData>(initialData);
  const todoList5 = useSelector((state: RootState) => state.genres);
  const todoList = useSelector((state: RootState) => state.search);
  const todoList2 = useSelector((state: RootState) => state.todogenres);
  const todoList3 = useSelector((state: RootState) => state.todostyles);
  const todoList4 = useSelector((state: RootState) => state.styles);
  const CastsStore = useSelector((state:RootState)=> state.cast)
  const SubCategoryStore = useSelector((state:RootState)=>state.subsearch)
  const DuringStore = useSelector((state:RootState)=>state.timesearch)
  const YearStore = useSelector((state:RootState)=>state.yearsearch)
  const SeasonStore = useSelector((state:RootState)=>state.seasonsearch)
  const OpenSubSearchStore = useSelector((state:RootState)=>state.OpenCloseSubSearch)
  const StudiosStore = useSelector((state:RootState)=>state.studios)
  const KisetsuStore = useSelector((state:RootState)=>state.kisetsu)
  const [checked1, setChecked1] = useState(DuringStore.times.time_gteq==""&&DuringStore.times.time_lteq==""?true:false);
  const [checked2, setChecked2] = useState(YearStore.years.year_season_years_year_gteq==""&&YearStore.years.year_season_years_year_lteq==""?true:false);
  const [checked3, setChecked3] = useState(SeasonStore.season_gteq==""&&SeasonStore.season_lteq==""?true:false);
  const dispatch = useDispatch();
  const router = useRouter() 
  const isFirstRender = useRef(false)
  const isFirstRender2 = useRef(false)
  useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
    isFirstRender.current = true
    isFirstRender2.current = true  
  }, [])
  const handleSubmit :React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();    
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({...data,title_or_titleKa_or_titleEn_or_titleRo_cont: value});
    if (router.pathname==="/search"){
    }else{
      router.push(`/search`)
    }
  }

  const afterhandleChange = (quicked:boolean) => {
    if(quicked===false){
    dispatch(addTodoAction(data.title_or_titleKa_or_titleEn_or_titleRo_cont));
    }
    setData({...data,quicked:false})
  };
  useEffect(() => {
    if(isFirstRender.current) { // 初回レンダー判定
      isFirstRender.current = false // もう初回レンダーじゃないよ代入
    } else {
    const timer = setTimeout(() => {
      afterhandleChange(data.quicked)
    }, 500)
    return () => clearTimeout(timer)
    }
  }, [data.title_or_titleKa_or_titleEn_or_titleRo_cont])

  const title_count_check = () =>{
    if (todoList.title_or_titleKa_or_titleEn_or_titleRo_cont.length===0) return
    return(
      <>
        <div className="header-search-contents__boxes__List"
          onClick={()=>deletingtag1()}
        >
          {todoList.title_or_titleKa_or_titleEn_or_titleRo_cont}
        </div>
      </>
    )
  }

  const styles_eq_check = () =>{
    if (Number(todoList3.styles_id_eq)===0) return
    return(
      <>
        <div className="header-search-contents__boxes__List"
        onClick={()=>deletingtag3()}
        >
          {Number(todoList3.styles_id_eq)-1>=0? todoList4.styles.filter((data:any) => data.id === Number(todoList3.styles_id_eq))[0].name:""}
        </div>
      </>
    )
  }

  const tag_clear_click=()=>{
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    // 2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    if (router.pathname==="/search"){      
    }else{
      router.push(`/search`)
    }
    
  }

  const tag_clear = () =>{
    if(todoList.title_or_titleKa_or_titleEn_or_titleRo_cont===""&& todoList2.janls_id_in.length===1&&todoList3.styles_id_eq===""&&CastsStore.castids.casts_id_in.length===1&&subSearchesTitle.length===0&&DuringStore.times.time_gteq===""&&YearStore.years.year_season_years_year_gteq===""&&SeasonStore.season_gteq===""&&StudiosStore.studio.length===0&&KisetsuStore.kisetsusids.year_season_seasons_id_eq==="") return 
    return (
      <>
        <div className="clear-botton"
        onClick={()=>tag_clear_click()}
        >
          クリア
        </div>
      </>
    )
  }
// genre
  const deletingtag2 = (item:number) =>{
    dispatch(clearTitleAction())
    dispatch(deletingtodoGenresDataExceptOneAction(String(item)))
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    //  
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    if (router.pathname==="/search"){      
    }else{
      router.push(`/search`)
    }
  }
// style
  const deletingtag3 = () =>{
    dispatch(clearTitleAction())
    dispatch(deletingtodoGenresDataALLAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
     // subCategorys
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    if (router.pathname==="/search"){
    }else{
      router.push(`/search`)
    }
  }
// title
  const deletingtag1 = () =>{
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(DeletingCastsDataAllAction())
     // subCategorys
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    if (router.pathname==="/search"){      
    }else{
      router.push(`/search`)
    }
  }
  // cast
  const deletingtagcast = (item:number,Cast:Cast) => {
    dispatch(clearTitleAction())
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataExceptOneAction(String(item),Cast))
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
     //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
    if (router.pathname==="/search"){      
    }else{
      router.push(`/search`)
    }
  }
  // deletingtagstudio
  const deletingtagstudio = (item:string,studios:Studios) => {
    dispatch(clearTitleAction())
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    dispatch(deletingtodoStudiosDataExceptOneAction(item,studios))
    dispatch(deletingtodoKisetsuDataAllAction())
     // subCategorys
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    if (router.pathname==="/search"){
    }else{
      router.push(`/search`)
    }
  }
  // deletingtagsKisetsu()
  const deletingtagsKisetsu = () => {
    dispatch(clearTitleAction())
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    dispatch(deletingtodoStudiosDataALLAction())
    // subCategorys
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    if (router.pathname==="/search"){      
    }else{
      router.push(`/search`)
    }
  }

  // sub click handler
  const deleteSubCategoryiesHandler = () => {
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    // subCategorys
    MdmuneCloseHandler()
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
  }


  const deleteduringHandler = () => {
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    // subCategorys
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
  }

  const deleteYearHandler = () => {
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroySeasonSearchAction())
    setChecked3(true)
    //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
  }

  const deleteSeasonHandler = () => {
    dispatch(deletingtodoGenresDataALLAction())
    dispatch(deletingtodoStylesDataAllAction())
    dispatch(clearTitleAction())
    setData({...data,quicked:true,title_or_titleKa_or_titleEn_or_titleRo_cont:""})
    dispatch(DeletingCastsDataAllAction())
    // subCategorys
    dispatch(AllDeleteSubClassAction())
    setSubSearchesTitle("")
    MdmuneCloseHandler()
    SetDefaultValue("All")
    dispatch(DestroyTimeSearchAction())
    setChecked1(true)
    dispatch(DestroyYearSearchAction())
    setChecked2(true)
    //  2.0
    dispatch(deletingtodoStudiosDataALLAction())
    dispatch(deletingtodoKisetsuDataAllAction())
  }

  // 
  const [subDefault,SetSubDefault] = useState<string>("All")
  const [MdMenuOpenState,SetMdMenuOpenState] = useState<boolean>(true)
  const MdmenuOpenHandler = () => {
    SetMdMenuOpenState(true)
    SetSubDefault(defaultValue)
    dispatch(OpenCloseManagementSubSearchAction(true))
  }
  const MdmuneCloseHandler = () => {
    SetMdMenuOpenState(false)
    dispatch(OpenCloseManagementSubSearchAction(false))
  }

  // default value
  const [defaultValue,SetDefaultValue] = useState<string>("All")
  const [subSearchesTitle,setSubSearchesTitle] = useState<string>("")
  useEffect(()=>{
    if(isFirstRender2.current) { // 初回レンダー判定
      isFirstRender2.current = false // もう初回レンダーじゃないよ代入
    } else {
    const timer = setTimeout(() => {

      if (defaultValue=="All"){
          dispatch(AllDeleteSubClassAction())
          setSubSearchesTitle("")
        }
      else if(defaultValue=="DeliveryEndQteQ"){
        const today = new Date()
        today.setHours(today.getHours() + 9)
        dispatch(DeilyEndQteQAction(today))
        setSubSearchesTitle("配信終了")
        }
      else if(defaultValue=="DeliveryStart"){
        const today = new Date()
        today.setHours(today.getHours() + 9)
        dispatch(DeilyStartQteQAction(today))
        setSubSearchesTitle("配信開始")

        }
      else if(defaultValue=="PickUp"){
        dispatch(SubPickupSearchAction(true))
        setSubSearchesTitle("おすすめ")
        }
      if (router.pathname==="/search"){
      }else{
        router.push(`/search`)
      }

    }, 500)

    return () => clearTimeout(timer)
  }
  
},[defaultValue])
  // 
  useEffect(()=>{
    if(OpenSubSearchStore.open==false){
      MdmuneCloseHandler()
    }
    // doneyet_2 trueを書くかどうか、動き未確認

  },[OpenSubSearchStore.open])

  // 
  const [MdMenuOpenState2,SetMdMenuOpenState2] = useState<boolean>(false)
  const MdmenuOpenHandler2 = () => {
    SetMdMenuOpenState2(true)
  }
  const MdmuneCloseHandler2 = () => {
    SetMdMenuOpenState2(false)
  }

  // user search
  const [openUserSearchModal,setOpenUserSearchModal] = useState<boolean>(false)
  const handleOpenUserSearchModal = () => {
    setOpenUserSearchModal(true)
  }

  //
  const [dataInfo,setDataInfo] = useState<string>("")
  useEffect(()=>{
    const handleSetDataInfo = async() => {
      const res = await execDataInfo()
      if (res.data.status==200){
        setDataInfo(res.data.info)
      }
    }
    handleSetDataInfo()
  },[])



  return(
    <>
    <form onSubmit={handleSubmit} autoComplete="off" >
      <div className=""
      style={{
        display:"flex",
        alignItems:"Center",
        gap:"10px"
      }}
      >
      <label>
        Search
      </label>
      <div className="UserSearchBotton"
      onClick={handleOpenUserSearchModal}
      style={{
        marginBottom:"10px",
        padding: "2px 10px 2px 10px",
        border: "1px solid #3788d8",
        borderRadius: "15px",
        color: "#3788d8",
        cursor:"pointer"
      }}
      >
        user  
      </div>
      <div className=""
      style={{
        marginBottom:"10px",
      }}
      >
        {dataInfo}
      </div>
      </div>
        <div className= "SearchInputContainer">
        <div className = "search__input__box">
        <IoSearchCircle/>
          <input 
          type="text" 
          name="name" 
          placeholder="アニメ、映画"
          value={data.title_or_titleKa_or_titleEn_or_titleRo_cont}
          autoComplete="off"
          onChange={handleChange}
          />
        </div>
        <MdMenuOpen
        className = {MdMenuOpenState2==false?"mdmenuopen":"mdmenuopen active-mdmenuopen"}
        onClick={MdMenuOpenState2==false?MdmenuOpenHandler2:MdmuneCloseHandler2}
        />
        {/* {MdMenuOpenState&&(
          <>
            <div className = "SubSearchContainer">
              
              <SubSearches
              subDefault = {subDefault}
              checked1 = {checked1}
              setChecked1 = {setChecked1}
              checked2 = {checked2}
              setChecked2 = {setChecked2}
              checked3 = {checked3}
              setChecked3 = {setChecked3}
              // timeDefault = {timeDefault}
              // setTimeDefault = {setTimeDefault}
              // MdMenuOpenState ={MdMenuOpenState}
              SetDefaultValue = {SetDefaultValue}
              />
            </div>
          </>
        )} */}
        </div>
      <div className = {`search__commit__box ${MdMenuOpenState2==false?"activeSubSearchV2":""}` }>
        <GenresSearch/>
        <Styles/>
        <CastsSearch/>
        <StudioSearch/>
        <SeasonSearch/>
        <YearSearch/>
        {/* <CategorySearch/> */}
      </div>
      <div className="header-search-contents">
        <div className="header-search-contents__boxes">
          <div className="header-search-contents__boxes__Lists">
            <div className = "header-search-contens__boxes__Lists__Logo">
              <FaTags></FaTags>
            </div>
            <div className = "header-search-contens__boxes__Lists__clean">
              {tag_clear()}
            </div>
              {title_count_check()}
            {todoList2.janls_id_in.map(Number).filter(x=>x>0).map((item:number)=>{
              return(
                <>
                  <div className="header-search-contents__boxes__List"
                  key={item}
                  onClick={()=>deletingtag2(item)}
                  >
                  { todoList5.genres[item-1].name}
                  </div>
                </>
              )
            })}
              {styles_eq_check()}
            {CastsStore.cast.map((item)=>{
              return(
                <>
                  <div className="header-search-contents__boxes__List"
                  key={item.id}
                  onClick={()=>deletingtagcast(item.id,item)}
                  >
                    {item.name}
                  </div>
                </>
              )
              })}
              {subSearchesTitle.length>0?
              <div className="header-search-contents__boxes__List"
              onClick={deleteSubCategoryiesHandler}
              >
                  {subSearchesTitle}
              </div>
              :
              ""
              }
              {DuringStore.times.time_gteq!=""&&(
                <>
                  {DuringStore.times.time_gteq==DuringStore.times.time_lteq?
                  <>
                    <div className="header-search-contents__boxes__List"
                    onClick={deleteduringHandler}
                    >
                      {DuringStore.times.time_gteq}
                    </div>
                  </>
                  :
                  <>
                    <div className="header-search-contents__boxes__List"
                    onClick={deleteduringHandler}
                    >
                    {DuringStore.times.time_gteq} ~ {DuringStore.times.time_lteq}
                    </div>
                  </>
                  }
                </>
              )}
              {StudiosStore.studio.map((item)=>{
                return(
                  <>
                    <div className="header-search-contents__boxes__List"
                    key={item.id}
                    onClick={()=>deletingtagstudio(String(item.id),item)}
                    >
                      {item.company}
                    </div>
                  </>
                )
              })}
              {KisetsuStore.kisetsusids.year_season_seasons_id_eq!=""&&(
                <div className="header-search-contents__boxes__List"
                onClick={()=>deletingtagsKisetsu()}
                >
                  {KisetsuStore.kisetsu.name}
                </div>
              )}
                

              {/* {YearStore.year2_gteq!=""&&(
                <>
                  {YearStore.year2_gteq==YearStore.year2_lteq?
                  <>
                    <div className="header-search-contents__boxes__List"
                    onClick={deleteYearHandler}
                    >
                      {YearStore.year2_gteq.slice(0,4)}
                    </div>
                  </>
                  :
                  <>
                    <div className="header-search-contents__boxes__List"
                    onClick={deleteYearHandler}
                    >
                    {YearStore.year2_gteq.slice(0,4)} ~ {YearStore.year2_lteq.slice(0,4)}
                    </div>
                  </>
                  }
                </>
              )} */}
              {YearStore.years.year_season_years_year_gteq!=""&&(
                <>
                  {YearStore.years.year_season_years_year_gteq==YearStore.years.year_season_years_year_lteq?
                  <>
                    <div className="header-search-contents__boxes__List"
                    onClick={deleteYearHandler}
                    >
                      {YearStore.years.year_season_years_year_gteq.slice(0,4)}
                    </div>
                  </>
                  :
                  <>
                    <div className="header-search-contents__boxes__List"
                    onClick={deleteYearHandler}
                    >
                    {YearStore.years.year_season_years_year_gteq.slice(0,4)} ~ {YearStore.years.year_season_years_year_lteq.slice(0,4)}
                    </div>
                  </>
                  }
                </>
              )}

              {SeasonStore.season_gteq!=""&&(
                <>
                  {SeasonStore.season_gteq==SeasonStore.season_lteq?
                  <>
                    <div className="header-search-contents__boxes__List"
                      onClick={deleteSeasonHandler}
                    >
                      {SeasonStore.season_gteq+"シーズン"}
                    </div>
                  </>
                  :
                  <>
                    <div className="header-search-contents__boxes__List"
                      onClick={deleteSeasonHandler}
                    >
                    {SeasonStore.season_gteq+"シーズン"} ~ {SeasonStore.season_lteq+"シーズン"}
                    </div>
                  </>
                  }
                </>
              )}
          </div>
          <div className = "header-search-contents__boxes__Lists__right">
            {/* <div className = "header-search-contents__boxes__Lists__right__Lists"> */}
              {/* <div className = "header-search-contents__boxes__Lists__right__Lists__logo">
                <FaSort/>
              </div>
              <div className = "header-search-contents__boxes__Lists__right__Lists__list">
                Sort
              </div>
              <div className = "header-search-contents__boxes__Lists__right__Lists__gridstyles">

              </div> */}
              <SortLists/>
              <GridStyles/>
              {/* <MdMenuOpen
                className = {MdMenuOpenState2==false?"mdmenuopen mdmenuopen2":"mdmenuopen mdmenuopen2 active-mdmenuopen"}
                onClick={MdMenuOpenState2==false?MdmenuOpenHandler2:MdmuneCloseHandler2}
              /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </form>

      {openUserSearchModal==true&&(
        <UserSearchModal
          openUserSearchModal={openUserSearchModal}
          setOpenUserSearchModal={setOpenUserSearchModal}

        />
      )}
    </>
  )
}
export default Search 