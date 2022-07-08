import { product } from "@/interfaces/product"
import { useRouter } from "next/router"
import { memo, useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
import dynamic from 'next/dynamic';
import { actionSettingProductData2 } from "@/store/product/actions";
import { useDispatch } from "react-redux";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  product:product
  right:number
  pushgridleft02:Function
  maxleft02:number
  avgScore: string | undefined 
}
type Color = {
  backgroundColor:string
}

export const GridProduct02:React.FC<Props> = memo(function GridProduct02Func(Props){
  const [colornumber,setColornumber ]= useState<number>()

  const elm = useRef<HTMLDivElement>(null!);
  const nodeRef = useRef(null)
  const [imageloding,setImageLoding2] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useDispatch()


  const navigateshow = ()=>{
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/title/${Props.product.id}`)
  }

  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
  },[])

  useEffect(()=>{
    
    const img = new Image()
    img.src = Props.product.imageUrl
    img.onload = () => {
      setImageLoding2(true)
    };
  },[Props.product])

  const [lefts,setLefts] = useState<number>(0)
  const [rights,setRights] = useState<number>(0)

  useEffect(()=>{
    handleSetupYearSeason()
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    Props.pushgridleft02(left)
  },[])

  const [scoreColor,setScoreColor] = useState<Color>({backgroundColor:""})
  useEffect(()=>{
    if(Props.avgScore==undefined)return
    const averageScore = Number(Props.avgScore)
    if(averageScore<=10){
      setScoreColor({backgroundColor:'rgba(255, 0, 0, 1)'})
    }else if(10<averageScore&&averageScore<=20){
      setScoreColor({backgroundColor:'rgba(255, 82, 0, 1)'})
    }else if(20<averageScore&&averageScore<=30){
      setScoreColor({backgroundColor:'rgba(255, 177, 0, 1)'})
    }else if(30<averageScore&&averageScore<=40){
      setScoreColor({backgroundColor:'rgb(239 222 24)'})
    }else if(40<averageScore&&averageScore<=50){
      setScoreColor({backgroundColor:'rgb(161 217 28)'})
    }else if(50<averageScore&&averageScore<=60){
      setScoreColor({backgroundColor:'rgb(15 221 1)'})
    }else if(60<averageScore&&averageScore<=70){
      setScoreColor({backgroundColor:'rgb(10 241 177)'})
    }else if(70<averageScore&&averageScore<=80){
      setScoreColor({backgroundColor:'rgba(0, 161, 255, 1)'})
    }else if(80<averageScore&&averageScore<=90){
      setScoreColor({backgroundColor:'rgba(0, 55, 255, 1)'})
    }else if(90<averageScore&&averageScore<=100){
      setScoreColor({backgroundColor:'rgba(255, 0, 235, 1)'})
    }
  },[Props.avgScore])

  // hover 
  const [ishover,setIshover] = useState<boolean>(false)
  const [ishover2,setIshover2] = useState<boolean>(false)
  const handlehoverEnter = () => {
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    left === Props.maxleft02&&right+20===Props.right?setIshover2(true):setIshover(true)

  };
  const handlehoverLeave = () => {
    const { left, top, right, bottom } = elm.current.getBoundingClientRect();
    left === Props.maxleft02&&right+20===Props.right?setIshover2(false):setIshover(false)

  }
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
      <div className = "WorldClassContainerViews GridProduct02Views"
        ref={elm}
      >
        <div className = "WorldClassContainerViewsImg">
        <CSSTransition in={imageloding}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
        {<img src = {typeof Props.product == "undefined"?"":Props.product.imageUrl} ref={nodeRef}/>}
        </CSSTransition>
          <div className = "WorldClassContainerViewsImgPlot">
            <div className="WorldClassContainerViewsRightLink"
            onClick={navigateshow}
            >
              詳細ページ
            </div>
            {Props.product&&Props.product?.list.length>0&&(
            <div className="WorldClassContainerViewsRightNetflix">
              <a href={`${Props.product?.list}`}>
                公式サイトへ
              </a>
            </div>
            )}
          </div>
          {Props.avgScore!=undefined&&(
            <div className="WorldClassContainerViewsRightScore Grid02ProductScore"
              style={scoreColor}
              >
              {Number(Props.avgScore).toFixed(1)}%
            </div>
            )}
        </div>
        <div className={`GridProduct02Arasuzi`}
        onMouseEnter={handlehoverEnter}
        onMouseLeave={handlehoverLeave}
        >
        <div className="WorldClassContainerViewsRightDummy">
          <div className="WorldClassContainerViewsRightTitle">
            {Props.product?.title}
          </div>
          <div className="WorldClassContainerViewsRightSubplot Grid02ProductSubplot">
            {Props.product?.productStyles!=undefined&&Props.product.productStyles.length>0&&(
              <div className={` p_contens_grid_color${colornumber}gc`}>
                {Props.product.productStyles[0].name}
              </div>
            )}
            {YearSeason!=""&&(
              <div className="WorldClassContainerViewsRightSubplot1">
              {YearSeason}
            </div>
            )}
          </div> 
          <div className={`WorldClassContainerViewsRightArasuzi`}   
          >
            <ReactQuill
            className = "reviews_modal_quill"     
            value={Props.product.arasuzi} 
            theme="bubble"
            readOnly={true}       
            />
          </div>
        </div>
        </div>
        <div className={`WorldClassContainerViewsRightGenres p_contens_grid_color${colornumber}g`}>
          <ul>
            {Props.product?.productGenres.map((item)=>{
              return(
                <li key={item.id}>
                  {item.name}
                </li>
              )
            })}
          </ul>
        </div>
        <CSSTransition in={ishover}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
          <div className = "p_contents_grid_hover_contents" ref={nodeRef}
          >
            <div className = "p_contents_grid_hover_contents__before">
              <div className = "p_contents_grid_hover_contents_arasuzi_Title">
                  あらすじ
              </div>
              <div className = "p_contents_grid_hover_contents_arasuzi">
                <ReactQuill
                  className = "reviews_modal_quill"     
                  value={Props.product.arasuzi} 
                  theme="bubble"
                  readOnly={true}       
                />
              </div>
              <div className="p_contents_grid_hover_contents_genres02">
                <ul>
                  {Props.product?.productGenres.map((item)=>{
                    return(
                      <li key={item.id}>
                        {item.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={ishover2}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>
          <div className = "p_contents_grid_hover_contents2" ref={nodeRef}
          >
            <div className = "p_contents_grid_hover_contents__before2">   
              <div className = "p_contents_grid_hover_contents_arasuzi_Title">
                  あらすじ
              </div>
              <div className = "p_contents_grid_hover_contents_arasuzi">
                <ReactQuill
                className = "reviews_modal_quill"     
                value={Props.product.arasuzi} 
                theme="bubble"
                readOnly={true}       
              />
              </div>
              <div className="p_contents_grid_hover_contents_genres02">
                <ul>
                  {Props.product?.productGenres.map((item)=>{
                    return(
                      <li key={item.id}>
                        {item.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>  
    </>
  )
})