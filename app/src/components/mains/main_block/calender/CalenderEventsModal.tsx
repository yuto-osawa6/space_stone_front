import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Modal } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { OpenContext } from 'contexttype/contexttype';
import { product } from 'interfaces/product';
// import { useNavigate } from 'react-router-dom';
// import ReactQuill from "react-quill"
import { actionSettingProductData2 } from 'store/product/actions';

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  product : product
  avgScore : string | undefined
}
type Color = {
  backgroundColor:string
}

export const CalendarEventsModal:React.FC<Props> = (Props) =>{
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

  const user = useSelector((state: RootState) => state.user);
  const {open, setOpen} = useContext(OpenContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  // const [averageScore,setAverageScore] = useState<number>()
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

  useEffect(()=>{
    handleSetupYearSeason()
  },[])
  // const setAverageScoreHandler = () => {
  //   if(Props.product==undefined)return
  //   if (Props.product?.scores.length>0){
  //   const result = Props.product?.scores.reduce(function(a, x){return a + x.value;}, 0);
  //   setAverageScore(result/Props.product?.scores.length)
  //   }
  // }

  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const productShowHandler = () => {
    dispatch(actionSettingProductData2(Props.product));
    // navigate(`products/${Props.product?.id}`)
  }
  // 
  const [YearSeason,setYearSeason]= useState<string>("")
  const handleSetupYearSeason = () => {
    const kisetsu = ["冬","春","夏","秋"]
    const yearSeasonYear = Props.product.productYearSeason2.filter(i=>kisetsu.includes(i.season.name)).sort((a,b)=>kisetsu.indexOf(a.season.name) - kisetsu.indexOf(b.season.name)).sort((a,b)=>new Date(a.year.year).getTime() - new Date(b.year.year).getTime())
    console.log(yearSeasonYear)
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "CalendarEventsModal">
            <div className = "CalendarEventsModalTop">
              <div className = "CalendarEventsModalTopImg">
                <img src={Props.product?.imageUrl}></img>
              </div>
              <div className = "CalendarEventsModalTopBottom">
                {/* {averageScore!=undefined&&(
                <p
                className = "CalendarEventsModalTopBottomScore" style={scoreColor}
                >SCORE {averageScore}%</p>
                )} */}
                 {Props.avgScore!=undefined&&(
                <p
                className = "CalendarEventsModalTopBottomScore" style={scoreColor}
                >SCORE {Number(Props.avgScore).toFixed(1)}%</p>
                )}
                <p
                className = "CalendarEventsModalTopBottomShow"
                onClick={productShowHandler}
                >詳細ページ</p>
                <p
                className = "CalendarEventsModalTopBottomNetFlix"
                // onClick={netflixHandler}
                >
                <a href = {Props.product?.list}>
                  公式サイト</a></p>                
              </div>
            </div>
            <div className = "CalendarEventsModalMain">
              <div className='CalendarEventsModalMainTitle'>
                {Props.product?.title}
              </div>
                <div className='CalendarEventsModalMainYear'>
                  <p>{Props.product?.productStyles[0].name}</p>
                  {/* <p>{Props.product?.year}</p>
                  <p>{Props.product?.duration}</p> */}
                  <p>{YearSeason}</p>
                </div>
              <div className = "CalendarEventsModalMainOverView">
                {/* {Props.product?.arasuzi} */}
                <ReactQuill
                className = "reviews_modal_quill"     
                modules={modules} value={Props.product.arasuzi} 
                theme="bubble"
                readOnly={true}       
                />
              </div>
              <div className = "CalendarEventsModalMainGenres">
                <ul>
                  {Props.product?.productGenres.map((item)=>{
                  return(
                    <li key={item.id}>{item.name}</li>
                  ) 
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>         
      </Modal>
    </>
  )
}