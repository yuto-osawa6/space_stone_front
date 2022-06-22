import { product } from "@/interfaces/product"
import { execArticleProductAssosiationsHandler } from "@/lib/api/article"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react"
import { IoTimeOutline, IoTimer } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { actionSettingProductData, actionSettingProductData2 } from "@/store/product/actions"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
type Props = {
  product:product
}

type Color = {
  backgroundColor:string
}
export const GridProduct04:React.FC<Props> = memo(function GridProduct04(Props){
  const [colornumber,setColornumber ]= useState<number>()

  useEffect(()=>{
    const array:number[] = [1,2,3,4,5,6,7,8,9,0]
    const colorNumber:number = array[Math.floor(Math.random() * array.length)]
    setColornumber(colorNumber)
    setAverageScoreHandler()
  },[])

  const router = useRouter()
  const Movementhandler = () => {
    router.push(`/products/${Props.product.id}`)
  }


  const [averageScore,setAverageScore] = useState<number>()
  const [scoreColor,setScoreColor] = useState<Color>({backgroundColor:""})
  useEffect(()=>{
    if(averageScore==undefined)return
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
  },[averageScore])

  const setAverageScoreHandler = () => {
    if (Props.product.scores.length>0){
    const result = Props.product.scores.reduce(function(a, x){return a + x.value;}, 0);
    setAverageScore(result/Props.product.scores.length)
    }
  }
  return(
    <> 
      <div className = "ArticleProductsGrid"
      onClick={Movementhandler}
      >
          <div className = "ArticleProductsGridLeft">
            <img src={Props.product.imageUrl}/>
            <div className="ArticleProductsGridLeftTitle">
              {Props.product.title}
            </div>
            {Props.product.scores.length>0&&(
              <div className="Grid04ProductScore"
                style={scoreColor}
                >
                {averageScore?.toFixed(1)}%
              </div>
            )}

          </div>
          <div className = "ArticleProductsGridRight">
            <div className="ArticleProductsGridRightTop">
              <div className="ArticleProductsGridRightTitle margin_bottom_list">
              {Props.product.productStyles.length>0&&(
                <p>{Props.product.productStyles[0].name}</p>
              )}      
              </div>
              {Props.product?.year!=null&&(
                <div className="ArticleProductsGridRightFlex1 margin_bottom_list">
                  <div className="ArticleProductsGridRightYear">
                    {Props.product?.year}
                  </div>
                  <div className="ArticleProductsGridRightDuration">
                    <p>{Props.product?.duration}</p>
                  </div>
                </div>
              )}
              <div className="ArticleProductsGridRightArasuzi margin_bottom_list">
                {/* {Props.product.arasuzi} doneyet arasuziではなくdescriptionという形でapiから送られている*/}
                <ReactQuill
                  className = "reviews_modal_quill"     
                  value={Props.product.arasuzi} 
                  theme="bubble"
                  readOnly={true}       
                />
              </div>
            </div>
            <div className={`ArticleProductsGridRightBottom p_contens_grid_color${colornumber}`}>
              <ul>
              {Props.product?.productGenres.map((item)=>{
                return(
                  <li
                  key={item.id}
                  >{item.name}</li>
                )
              })}
              </ul>
            </div>
          </div>
        </div>
    </>
  )
})