import { product } from "@/interfaces/product"
import { memo, useEffect, useState } from "react"
import { BsFillSuitHeartFill ,BsFillSuitClubFill,BsFillSuitSpadeFill, BsFillSuitDiamondFill} from "react-icons/bs"
import { useDispatch } from "react-redux"
import { actionSettingProductData2 } from "@/store/product/actions"
import { useRouter } from "next/router"

type Props = {
  product:product
  averageScore: scoreAvg | undefined
  judgecard:number
  likesCount?:number
  rank? :number
}
type Color = {
  color:string
}
type scoreAvg = {
  [k:number]:string
}
export const ToptensList2:React.FC<Props> = memo(function ToptensList2Func(Props){
  const [colornumber,setColornumber ]= useState<number>(0)

  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
    handleSetupYearSeason()
  },[])
  // doneyet_4 (undefinedが帰ってきた時エラー)
  const [averageScore,setAverageScore] = useState<number>()
  const [scoreColor,setScoreColor] = useState<Color>({color:""})
  useEffect(()=>{
    if(averageScore==undefined)return
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
      setScoreColor({color: 'rgb(9 215 110)'})
    }else if(70<averageScore&&averageScore<=80){
      setScoreColor({color:'rgba(0, 161, 255, 1)'})
    }else if(80<averageScore&&averageScore<=90){
      setScoreColor({color:'rgba(0, 55, 255, 1)'})
    }else if(90<averageScore&&averageScore<=100){
      setScoreColor({color:'rgba(255, 0, 235, 1)'})
    }
  },[Props.averageScore])


  const [scoreLenght,setScoreLength] = useState<string>("")
  // 1k 1m setting 
  // const settingNumberOfDigits = (i:number) => {
  //   const integerDigit = String(i).length; 
  //   if (integerDigit>3&&integerDigit<7){
  //     const ii = i.toLocaleString()
  //     setScoreLength(String(ii).slice( 0, -1 )+"k")
  //   }else if(integerDigit>=7){
  //     const ii = i.toLocaleString()
  //     setScoreLength(String(ii).slice( 0, -5 )+"m")
  //   }else{
  //     setScoreLength(String(i))
  //   }

  // }
  // const navigate = useNavigate()
  const router = useRouter()
  const dispatch = useDispatch()
  const navigateHandler = () => {
    dispatch(actionSettingProductData2(Props.product));
    router.push(`/title/${Props.product.id}`)
  }
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
  // console.log(Props)
  return(
    <>
      <div className = "ToptensContainerGridList"
      onClick={navigateHandler}
      >
        
        <div className = "ToptensContainerGridListImage">
          <img src={Props.product.imageUrl}></img>
          <div className = "ToptensContainerGridListRank">
            {Props.judgecard==1 &&(
            <>
              <BsFillSuitHeartFill
              className = "ToptensContainerGridListRankTranpHeart ToptensContainerGridListRankTranp"
              />
            </>
            )}
            {Props.judgecard==2 &&(
            <>
              <BsFillSuitSpadeFill
              className = "ToptensContainerGridListRankTranpSpade ToptensContainerGridListRankTranp"
              />
            </>
            )}
            {Props.judgecard==3 &&(
            <>
              <BsFillSuitDiamondFill
              className = "ToptensContainerGridListRankTranpDiamond ToptensContainerGridListRankTranp"
              />
            </>
            )}
            {Props.judgecard==4 &&(
            <>
              <BsFillSuitClubFill
              className = "ToptensContainerGridListRankTranpClub ToptensContainerGridListRankTranp"
              />
            </>
            )}
            <p>{Props.rank}</p>
          </div>
        </div>
        <div className = "ToptensContainerGridListBox1">
          <div className = "ToptensContainerGridListTitle">
            {Props.product.title}
          </div>  
          <div className = "ToptensContainerGridListGenre">
            {/* {Props.product.productGenres.map((item)=>{
              return(
                  <li key={item.id} className={`p_contens_grid_color${colornumber}g`}>{item.name}</li>
              )
            })} */}
              {Props.averageScore!=undefined&&(
            <div className = "ToptensContainerGridListScore">
          <div className = "ToptensContainerGridListScoreUpper ToptensContainerGridListUpperShare">
        
            <p style={scoreColor}>{Number(Props.averageScore).toFixed(1)}%</p>
    
          </div>
            <div className = "ToptensContainerGridListScoreDown ToptensContainerGridListDownShare">
          </div>
        </div>
        )}
        
        <div className = "ToptensContainerGridSeries">

          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListUpperShare">
          {Props.product.productStyles.length>0&&(
            <p>{Props.product.productStyles[0].name}</p>
          )}
          </div>
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListDownShare">
          </div>
        </div>
        <div className = "ToptensContainerGridSeries">
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListUpperShare">
              {YearSeason}
          </div>
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListDownShare">
          </div>
        </div>
          {Props.product.productGenres.map((item)=>{
              return(
                  <li key={item.id} className={`p_contens_grid_color${colornumber}g`}>{item.name}</li>
              )
          })}
        
          </div>    
        </div>
        {/* <div className = "ToptensContainerGridListScore">
          <div className = "ToptensContainerGridListScoreUpper ToptensContainerGridListUpperShare">
          {Props.averageScore!=undefined&&(
            <p style={scoreColor}>{Number(Props.averageScore).toFixed(1)}%</p>
          )}
          </div>
            <div className = "ToptensContainerGridListScoreDown ToptensContainerGridListDownShare">
          </div>
        </div> */}
        
        {/* <div className = "ToptensContainerGridSeries">

          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListUpperShare">
          {Props.product.productStyles.length>0&&(
            <p>{Props.product.productStyles[0].name}</p>
          )}
          </div>
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListDownShare">
          </div>
        </div> */}
        {/* <div className = "ToptensContainerGridSeries">
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListUpperShare">
              {YearSeason}
          </div>
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListDownShare">
          </div>
        </div> */}
        {/* <div className = "ToptensContainerGridListGenre2">
          <div className="">
            ジャンル
          </div>
          {Props.product.productGenres.map((item)=>{
            return(
                <li key={item.id} className={`p_contens_grid_color${colornumber}g`}>{item.name}</li>
            )
          })}
        </div>     */}
      </div>
    </>
  )
})