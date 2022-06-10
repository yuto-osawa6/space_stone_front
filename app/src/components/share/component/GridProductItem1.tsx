import { product } from "@/interfaces/product"
import Image from "next/image";
import Router from "next/router";
import { memo, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { CSSTransition } from "react-transition-group";



type Props = {
  product : product
  push : Function
  left_grid : number
  right : number
  avgScore: string | undefined
}

type Color = {
  color:string
}

type Tags = {
  id:number
  genre:number
  tag:string
  rank:number
}

export const GridProductItem1:React.FC<Props> = memo(function GridProductItem1Func(Props){
  // colornumber
  const [colornumber,setColornumber ]= useState<number>(0)
  const colorNumberHandler = () => {
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
  }
  // ------------------------------------------------------------------
  const nodeRef = useRef(null)
  const [imageloding,setImageLoding] = useState<boolean>(false)
  const [ishover,setIshover] = useState<boolean>(false)
  const [ishover2,setIshover2] = useState<boolean>(false)
  const [lefts,setLefts] = useState<number>(0)
  const [rights,setRights] = useState<number>(0)
  // 平均スコア-----------------------------------------------------------
  // const [averageScore,setAverageScore] = useState<number | undefined>(Props.avgScore!=undefined?Number(Props.avgScore):undefined)
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
  // const navigate = useNavigate();
  const elm = useRef<HTMLDivElement>(null!);
   useEffect(()=>{
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    setLefts(left)
    setRights(right)
    Props.push(left)
    // const img = new Image()
    // console.log(Props.product.imageUrl)
    // img.src = Props.product.imageUrl
    // img.onload = () => {
    //   setImageLoding(true)
    // };
    colorNumberHandler()
    handleSetupYearSeason()
  },[])
  const dispatch = useDispatch()
  const navigateProductShow =() =>{
    // dispatch(actionSettingProductData2(Props.product));
    Router.push(`/title/${Props.product.id}`)
  }
  const handlehoverLeave = () => {
    lefts === Props.left_grid&&rights===Props.right?setIshover2(false):setIshover(false)
  }
  const handlehoverEnter = () => {
    lefts === Props.left_grid&&rights===Props.right?setIshover2(true):setIshover(true)
  };

  // year season
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
  return(
    <>
      <div className = {`NewNetflixContainerGridList ${ishover||ishover2?"addClassOverflow":""}`}
      ref={elm}
      onMouseEnter={handlehoverEnter}
      onMouseLeave={handlehoverLeave}
      onClick = {navigateProductShow}
      >
        <div className = "NewNetflixContainerGridListImage">
          {/* <CSSTransition in={imageloding}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit> */}
          {/* {<img src = {Props.product.imageUrl} ref={nodeRef}/>} */}
          {Props.product.imageUrl!=undefined&&(
          <img src = {Props.product.imageUrl} ref={nodeRef}/>
          // <Image src={Props.product.imageUrl} layout='fill' priority={true}/>
          )}
          {/* </CSSTransition> */}
        </div>
        <div className = "NewNetflixContainerGridListTitle">
          {Props.product.title}
        </div>
        <>
          <CSSTransition in={ishover}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
          
          <div className = "p_contents_grid_hover_contents" ref={nodeRef}
          >
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
                  <div className = "p_contents_grid_hover_contents_score " style={scoreColor}>
                    {Props.avgScore!=undefined?Number(Props.avgScore).toFixed(1):""}%
                  </div>
                )}
              </div>
              <div className = "p_contents_grid_hover_contents_styles">
                {YearSeason!=""&&(
                  <div className="WorldClassContainerViewsRightSubplot1">
                  {YearSeason}
                </div>
                )}
              </div>
              <div className = "p_contents_grid_hover_contents_genres">
                {Props.product.productGenres.map((item)=>{ 
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
                  <div className = "p_contents_grid_hover_contents_score " style={scoreColor}>
                    {Props.avgScore!=undefined?Number(Props.avgScore).toFixed(1):""}%
                  </div>
                  )}
                </div>
                <div className = "p_contents_grid_hover_contents_styles">
                {YearSeason!=""&&(
                  <div className="WorldClassContainerViewsRightSubplot1">
                  {YearSeason}
                </div>
                )}
                </div>
                <div className = "p_contents_grid_hover_contents_genres">
                  {Props.product.productGenres.map((item)=>{  
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
})