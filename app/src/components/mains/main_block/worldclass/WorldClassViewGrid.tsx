import { product } from "interfaces/product"
import { useEffect, useMemo, useRef, useState } from "react"
// import ReactQuill from "react-quill"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { actionSettingProductData2 } from "store/product/actions"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  product : product
  avgScore: string | undefined
}
type Color = {
  backgroundColor:string
}

export const WorldClassViewGrid:React.FC<Props> = (Props) => {
  const nodeRef = useRef(null)
  const [imageloding,setImageLoding2] = useState<boolean>(false)
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const navigateshow = ()=>{
    dispatch(actionSettingProductData2(Props.product));
    // navigate(`/products/${Props.product.id}`)
  }

   useEffect(()=>{
    const img = new Image()
    img.src = Props.product.imageUrl
    img.onload = () => {
      setImageLoding2(true)
    };
  },[Props.product])

  // useEffect(()=>{
  //   // setAverageScoreHandler()
  // },[])




  // const [averageScore,setAverageScore] = useState<number>()
  const [scoreColor,setScoreColor] = useState<Color>({backgroundColor:""})
  useEffect(()=>{
    if(Props.avgScore==undefined)return
    const  averageScore = Number(Props.avgScore)
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
  // 
  // const [averageScore,setAverageScore] = useState<number>(0)
  // doneyet_4 (undefinedが帰ってきた時エラー)
  // const setAverageScoreHandler = () => {
  //   if (Props.product.scores.length>0){
  //   const result = Props.product.scores.reduce(function(a, x){return a + x.value;}, 0);
  //   // console.log(result/Props.product.scores.length)
  //   setAverageScore(result/Props.product.scores.length)
  //   }
  // }


  // 
  const modules = useMemo(()=>({
    toolbar:{ 
      container:[
      // [{ font: [] }],
      [{ header: 1 },{ header: 2 }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      // [{ script:  "sub" }, { script:  "super" }],
      ["blockquote"
    ],
      // "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
    ],
  }
  }
  ),[])

  useEffect(()=>{
    handleSetupYearSeason()
  },[])
  // year season
  const [YearSeason,setYearSeason]= useState<string>("")
  const handleSetupYearSeason = () => {
    const kisetsu = ["冬","春","夏","秋"]
    const yearSeasonYear = Props.product.productYearSeason2.filter(i=>kisetsu.includes(i.season.name)).sort((a,b)=>kisetsu.indexOf(a.season.name) - kisetsu.indexOf(b.season.name)).sort((a,b)=>new Date(a.year.year).getTime() - new Date(b.year.year).getTime())
    // console.log(yearSeasonYear)
    try{
      if (yearSeasonYear.length==1){
        setYearSeason(`${new Date(yearSeasonYear[0].year.year).getFullYear()} ${yearSeasonYear[0].season.name}`)
      }else{
        setYearSeason(`${new Date(yearSeasonYear[0].year.year).getFullYear()} ${yearSeasonYear[0].season.name} ~ ${new Date(yearSeasonYear[yearSeasonYear.length-1].year.year).getFullYear()}  ${yearSeasonYear[yearSeasonYear.length-1].season.name}`)
      }
    }catch(e){

    }
  }

  // console.log(Props)
  // console.log(YearSeason)
  return(
    <>
      <div className = "WorldClassContainerViews">
          <div className = "WorldClassContainerViewsImg">
            <CSSTransition in={imageloding}  nodeRef={nodeRef} timeout={300} classNames="my-node"  unmountOnExit>

       
            {<img src = {typeof Props.product == "undefined"?"":Props.product.imageUrl} ref={nodeRef}
     
            />}


            </CSSTransition>


            <div className = "WorldClassContainerViewsImgPlot">
              {Props.avgScore!=undefined&&(
              <div className="WorldClassContainerViewsRightScore"
                style={scoreColor}
                >
                {Number(Props.avgScore).toFixed(1)}%
              </div>
              )}
              <div className="WorldClassContainerViewsRightLink"
              onClick={navigateshow}
              >
                詳細ページ
              </div>
              <div className="WorldClassContainerViewsRightNetflix">
      
                <a href={`${Props.product?.list}`}>
                公式サイトへ
                </a>
              </div>
            </div>
          </div>
          <div className="WorldClassContainerViewsRight">
          <div className="WorldClassContainerViewsRightDummy">
            <div className="WorldClassContainerViewsRightTitle">
              {Props.product?.title}
            </div>
            <div className="WorldClassContainerViewsRightSubplot">
              {Props.product?.productStyles!=undefined&&Props.product.productStyles.length>0&&(
                <div className="WorldClassContainerViewsRightShow">
                  {Props.product.productStyles[0].name}
                </div>
              )}
              {/* {Props.product?.year!=undefined&&(
                <div className="WorldClassContainerViewsRightSubplot1">
                {Props.product?.year}
              </div>
              )} */}
               {YearSeason!=""&&(
                <div className="WorldClassContainerViewsRightSubplot1">
                {YearSeason}
              </div>
              )}
              {/* {Props.product?.duration!=undefined&&(
                <div className="WorldClassContainerViewsRightSubplot2">
                {Props.product?.duration}
                </div>
              )} */}
              

            </div>
            
            <div className="WorldClassContainerViewsRightArasuzi">
              <ReactQuill
                className = "reviews_modal_quill"     
                modules={modules} value={Props.product.arasuzi} 
                theme="bubble"
                readOnly={true}       
              />
            </div>
          </div>
          </div>
          <div className="WorldClassContainerViewsRightGenres">
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
        
    </>
  )
}