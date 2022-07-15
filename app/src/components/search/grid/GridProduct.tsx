import { fontWeight } from "@mui/system";
import { product } from "@/interfaces/product";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState ,forwardRef } from "react"
import { IoCloudyNightOutline } from "react-icons/io5";
import { MdOutlineStarRate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import { actionSettingProductData2 } from "@/store/product/actions";
import { RootState } from "@/store";
import { useWindowDimensions } from "@/hook/useWindowResize";

type ProductGenres = {
  id:number
  name:string
}

type Props = {
  product:product
  push:Function
  left_grid:number
  right:number
  avgScore: string | undefined
}
type Color = {
  color:string
}

export const GridProducts:React.FC<Props> = function GridProductsFunc(Props){
  const todoList = useSelector((state: RootState) => state.search);
  const todoGenresList = useSelector((state: RootState) => state.todogenres);
  const todoStylesList = useSelector((state: RootState) => state.todostyles);
  const CastsStore = useSelector((state: RootState)=> state.cast)
  const SubSearchesStore = useSelector((state: RootState)=> state.subsearch)
  const TimeStore = useSelector((state:RootState)=> state.timesearch)
  const YearStore = useSelector((state:RootState)=> state.yearsearch)
  const SeasonStore = useSelector((state:RootState)=> state.seasonsearch)
  const PeriodStore = useSelector((state:RootState)=>state.SortPeriod)
  // v2.0
  const StudiosStore = useSelector((state:RootState)=>state.studios)
  const KisetsuStore = useSelector((state:RootState)=>state.kisetsu)
  const EmotionSortStore = useSelector((state:RootState)=>state.sortEmotion)
  const grid = useSelector((state: RootState) => state.grid);
  const sort = useSelector((state: RootState) => state.sort)

  const [colornumber,setColornumber ]= useState<number>()
  // 平均スコア
  const [scoreColor,setScoreColor] = useState<Color>({color:""})
  useEffect(()=>{
    if(Props.avgScore==undefined)return
    const averageScore = Number(Props.avgScore)
    if(averageScore<=10){
      setScoreColor({color:'rgba(255, 0, 0, 1)'})
    }else if(10<averageScore&&averageScore<=20){
      setScoreColor({color:'rgba(255, 82, 0, 1)'})
    }else if(20<averageScore&&averageScore<=30){
      setScoreColor({color:'rgba(255, 177, 0, 1)'})
    }else if(30<averageScore&&averageScore<=40){
      setScoreColor({color:'rgb(239 222 24)'})
    }else if(40<averageScore&&averageScore<=50){
      setScoreColor({color:'rgb(161 217 28)'})
    }else if(50<averageScore&&averageScore<=60){
      setScoreColor({color:'rgb(15 221 1)'})
    }else if(60<averageScore&&averageScore<=70){
      setScoreColor({color:'rgb(10 241 177)'})
    }else if(70<averageScore&&averageScore<=80){
      setScoreColor({color:'rgba(0, 161, 255, 1)'})
    }else if(80<averageScore&&averageScore<=90){
      setScoreColor({color:'rgba(0, 55, 255, 1)'})
    }else if(90<averageScore&&averageScore<=100){
      setScoreColor({color:'rgba(255, 0, 235, 1)'})
    }
  },[Props.avgScore])
  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
    handleSetupYearSeason()
  },[])
  const [ishover,setIshover] = useState<boolean>(false)
  const [ishover2,setIshover2] = useState<boolean>(false)
  const [lefts,setLefts] = useState<number>(0)
  const [rights,setRights] = useState<number>(0)
  const [imageloding,setImageLoding] = useState<boolean>(false)
  const elm = useRef<HTMLDivElement>(null!);
  const router = useRouter()
  const dispatch = useDispatch();
  const windowSize = useWindowDimensions()
  const handlehoverEnter = () => {
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    // console.log(left,Props.left_grid)
    // console.log(right+20,Props.right)
    if(windowSize.width >= 768){
    left === Props.left_grid&&right+20===Props.right?setIshover2(true):setIshover(true)
    }
  };
  const handlehoverLeave = () => {
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    if(windowSize.width >= 768){
    left === Props.left_grid&&right+20===Props.right?setIshover2(false):setIshover(false)
    }
  }
  useEffect(()=>{
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    Props.push(left)
    if(Props.product.imageUrl==null)return
    const img = new Image()
    img.src = Props.product.imageUrl
    img.onload = () => {
      setImageLoding(true)
    };
  },[])
  const navigateProductShow =() =>{
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/title/${Props.product.id}`)
  }
  const nodeRef = React.useRef(null)
  const [YearSeason,setYearSeason]= useState<string>("")
  const handleSetupYearSeason = () => {
    const kisetsu = ["冬","春","夏","秋"]
    const yearSeasonYear = Props.product.productYearSeason2.filter(i=>kisetsu.includes(i.season.name)).sort((a,b)=>kisetsu.indexOf(a.season.name) - kisetsu.indexOf(b.season.name)).sort((a,b)=>new Date(a.year.year).getTime() - new Date(b.year.year).getTime())
    try{
      if (yearSeasonYear.length==1){
        setYearSeason(`${new Date(yearSeasonYear[0].year.year).getFullYear()} ${yearSeasonYear[0].season.name}`)
      }else{
        setYearSeason(`${new Date(yearSeasonYear[0].year.year).getFullYear()} ${yearSeasonYear[0].season.name} ~ ${new Date(yearSeasonYear[yearSeasonYear.length-1].year.year).getFullYear()}  ${yearSeasonYear[yearSeasonYear.length-1].season.name}`)
      }
    }catch(e){
    }
  }
  return (
    <>
      <div className = {`p_contents_grid`}
      ref={elm}
      onMouseEnter={handlehoverEnter}
      onMouseLeave={handlehoverLeave}
      onClick = {navigateProductShow}
      >
        <div className = {`p_contents_grid_list p_contens_grid_color${colornumber}`}>
          <CSSTransition in={imageloding}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
            {<img src = {Props.product.imageUrl} ref={nodeRef}/>}
          </CSSTransition>
        </div>
        <div className = "p_contents_grid_title">
          {Props.product.title}
        </div>
        <>
          <CSSTransition in={ishover}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
          {
          <div className = "p_contents_grid_hover_contents" ref={nodeRef}>
            <div className = "p_contents_grid_hover_contents__before">
              <div className = "p_contents_grid_hover_contents_title">
                {Props.product.productStyles.length>0?
                <>
                {Props.product.productStyles[0].name}
                </>
                :
                ""
                }
              {Props.avgScore!=undefined&&(
              <div className = "p_contents_grid_hover_contents_score" style={scoreColor}>
                {/* <MdOutlineStarRate/> */}
                {Props.avgScore!=undefined?Number(Props.avgScore).toFixed(1):""}%
              </div>
              )}
              </div>
              <div className = {`p_contents_grid_hover_contents_styles p_contens_grid_color${colornumber}gc`}>
                <div className = "p_contents_grid_hover_contents_styles_right">
                  {YearSeason}
                </div>
                <div className = "p_contents_grid_hover_contents_styles_right">
                </div>
              </div>
              {Props.product.deliveryStart!=undefined&&(
                  <div className = "p_contents_grid_hover_contents_delivery_end">
                    配信開始日:{Props.product.deliveryStart}
                  </div>
              )}
              <div className = "p_contents_grid_hover_contents_genres">
                {Props.product.productGenres.map((item: ProductGenres)=>{
                  
                  return(
                      <div className = {`p_contents_grid_hover_contents_genre p_contens_grid_color${colornumber}g`}
                      key={item.id}
                      >
                        {item.name}
                      </div>
                  )
                })}
              </div>
            </div>
          </div>
          }
          </CSSTransition>
        </>
        <>
        <CSSTransition in={ishover2}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
          <div className = "p_contents_grid_hover_contents2" ref={nodeRef}>
            <div className = "p_contents_grid_hover_contents__before2">
              <div className = "p_contents_grid_hover_contents_title">
              {Props.product.productStyles.length>0?
                <>
                {Props.product.productStyles[0].name}
                </>
                :
                ""
                }
              {Props.avgScore!=undefined&&(
              <div className = "p_contents_grid_hover_contents_score" style={scoreColor}>
                {/* <MdOutlineStarRate/> */}
                {Props.avgScore!=undefined?Number(Props.avgScore).toFixed(1):""}%
              </div>
              )}
              </div>
              <div className = {`p_contents_grid_hover_contents_styles p_contens_grid_color${colornumber}gc`}>
                <div className = "p_contents_grid_hover_contents_styles_right">
                  {YearSeason}
                </div>
                <div className = "p_contents_grid_hover_contents_styles_right">
                </div>
              </div>
              {Props.product.deliveryStart!=undefined&&(
                <div className = "p_contents_grid_hover_contents_delivery_end">
                  配信開始日:{Props.product.deliveryStart}
                </div>
              )}
              <div className = "p_contents_grid_hover_contents_genres">
                {Props.product.productGenres.map((item: ProductGenres)=>{
                  
                  return(
                    <div className = {`p_contents_grid_hover_contents_genre p_contens_grid_color${colornumber}g`}
                    key={item.id}
                    >
                      {item.name}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          </CSSTransition>
        </>
      </div>
    </>

  )
}
