import { product } from "@/interfaces/product"
import { execPublishedOne } from "@/lib/api/admin/product"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsFillSuitHeartFill ,BsFillSuitClubFill,BsFillSuitSpadeFill, BsFillSuitDiamondFill} from "react-icons/bs"
type Props = {
  product:product
}
type Color = {
  color:string
}
export const AdminProductGrid:React.FC<Props> = (Props) => {
  const [colornumber,setColornumber ]= useState<number>(0)

  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
    setAverageScoreHandler()
    settingNumberOfDigits(Props.product.scores.length)
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
  },[averageScore])

  const setAverageScoreHandler = () => {
    if (Props.product.scores.length>0){
    const result = Props.product.scores.reduce(function(a, x){return a + x.value;}, 0);
    setAverageScore(result/Props.product.scores.length)
    }
  }
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
  const router = useRouter()
  const navigateHandler = () => {
    router.push(`/title/${Props.product.id}`)
  }
  // 公開
  const [fini,setFini] = useState<boolean>(Props.product.finished)
  const handlePublishedOne = async(i:number) => {
    const res = await execPublishedOne(Props.product.id,i)
    if(res.status ===200){
      setFini(res.data.product.finished)
    }else{

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
          <img src={Props.product.imageUrl} alt=""></img>
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
          {Props.product.scores.length>0&&(
            <p style={scoreColor}>{averageScore?.toFixed(1)}%</p>
          )}
          </div>
          <div className = "ToptensContainerGridListScoreDown ToptensContainerGridListDownShare">
          {Props.product.scores.length>0&&(
            <p>{scoreLenght}</p>

          )}
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
              { Props.product.year}
          </div>
          <div className = "ToptensContainerGridListSeriesUpper ToptensContainerGridListDownShare">
            {Props.product.duration}
          </div>
        </div>
      </div>
      <div className="">
        {fini==true&&(
          <div className=""
          onClick={()=>handlePublishedOne(0)}
          >
            公開
          </div>
        )}
        {fini==false&&(
          <div className=""
          onClick={()=>handlePublishedOne(1)}
          >
            非公開
          </div>
        )}
      </div>
    </>
  )
}