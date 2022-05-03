import { product } from "@/interfaces/product"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsFillSuitHeartFill ,BsFillSuitClubFill,BsFillSuitSpadeFill, BsFillSuitDiamondFill} from "react-icons/bs"
// import { useNavigate } from "react-router-dom"

type Props = {
  product:product
  avgScore: string | undefined
}
type Color = {
  color:string
}
export const GridProduct03:React.FC<Props> = function GridProduct03Func(Props){
  const [colornumber,setColornumber ]= useState<number>(0)

  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
    // setAverageScoreHandler()
    handleSetupYearSeason()
    // settingNumberOfDigits(Props.product.scores.length)
  },[])

  // const [averageScore,setAverageScore] = useState<number>()
  const [scoreColor,setScoreColor] = useState<Color>({color:""})
  useEffect(()=>{
    // if(averageScore==undefined)return
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
      setScoreColor({color: 'rgb(9 215 110)'})
    }else if(70<averageScore&&averageScore<=80){
      setScoreColor({color:'rgba(0, 161, 255, 1)'})
    }else if(80<averageScore&&averageScore<=90){
      setScoreColor({color:'rgba(0, 55, 255, 1)'})
    }else if(90<averageScore&&averageScore<=100){
      setScoreColor({color:'rgba(255, 0, 235, 1)'})
    }
  },[Props.avgScore])

  // const setAverageScoreHandler = () => {
  //   if (Props.product.scores.length>0){
  //   const result = Props.product.scores.reduce(function(a, x){return a + x.value;}, 0);
  //   // console.log(result/Props.product.scores.length)
  //   setAverageScore(result/Props.product.scores.length)
  //   }
  // }

  const [scoreLenght,setScoreLength] = useState<string>("")
  // 1k 1m setting 
  const settingNumberOfDigits = (i:number) => {
    const integerDigit = String(i).length; 
    if (integerDigit>3&&integerDigit<7){
      const ii = i.toLocaleString()
      setScoreLength(String(ii).slice( 0, -1 )+"k")
    }else if(integerDigit>=7){
      const ii = i.toLocaleString()
      setScoreLength(String(ii).slice( 0, -5 )+"m")
    }else{
      setScoreLength(String(i))
    }

  }
  // const navigate = useNavigate()
  const router = useRouter()

  const navigateHandler = () => {
    router.push(`/products/${Props.product.id}`)
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
      <div className = "ToptensContainerGridList"
      onClick={navigateHandler}
      >
        <div className = "ToptensContainerGridListRank">
        </div>
        <div className = "ToptensContainerGridListImage">
          <img src={Props.product.imageUrl}></img>
        </div>
        <div className = "ToptensContainerGridListBox1">
          <div className = "ToptensContainerGridListTitle">
            {Props.product.title}
          </div>  
          <div className = "ToptensContainerGridListGenre">
            {Props.product.productGenres.map((item)=>{
              return(
                  <li key={item.id} className={`p_contens_grid_color${colornumber}g`}>{item.name}</li>
              )
            })}
          </div>    
        </div>
        <div className = "ToptensContainerGridListScore">
          <div className = "ToptensContainerGridListScoreUpper ToptensContainerGridListUpperShare">
          {Props.avgScore!=undefined&&(
            <p style={scoreColor}>{Props.avgScore!=undefined?Number(Props.avgScore).toFixed(1):undefined}%</p>
          )}
          </div>
           <div className = "ToptensContainerGridListScoreDown ToptensContainerGridListDownShare">
          </div>
        </div>
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
        </div>
      </div>
    </>
  )
}