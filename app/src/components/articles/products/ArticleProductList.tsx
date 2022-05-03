import { product } from "@/interfaces/product"
import { memo, useEffect, useState } from "react"
import { IoTimer } from "react-icons/io5"
// import ReactQuill from "react-quill"
import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { actionSettingProductData2 } from "@/store/product/actions"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  product:product
}
export const ArticleProductList:React.FC<Props> = memo(function ArticleProductList(Props){
  const [colornumber,setColornumber ]= useState<number>(0)
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const Movementhandler = () => {
    if(Props.product==undefined)return
    dispatch(actionSettingProductData2(Props.product))
    // navigate(`/products/${Props.product?.id}`)
  }

  useEffect(()=>{
    // handleSetupYearSeason()
  },[])

  const [YearSeason,setYearSeason]= useState<string>("")
  // const handleSetupYearSeason = () => {
  //   const kisetsu = ["冬","春","夏","秋"]
  //   // if(Props.product.productYearSeason2!=undefined)return
  //   const yearSeasonYear = Props.product.productYearSeason2.filter(i=>kisetsu.includes(i.season.name)).sort((a,b)=>kisetsu.indexOf(a.season.name) - kisetsu.indexOf(b.season.name)).sort((a,b)=>new Date(a.year.year).getTime() - new Date(b.year.year).getTime())
  //   try{
  //     if (yearSeasonYear.length==1){
  //       setYearSeason(`${new Date(yearSeasonYear[0].year.year).getFullYear()} ${yearSeasonYear[0].season.name}`)
  //     }else{
  //       setYearSeason(`${new Date(yearSeasonYear[0].year.year).getFullYear()} ${yearSeasonYear[0].season.name} ~ ${new Date(yearSeasonYear[yearSeasonYear.length-1].year.year).getFullYear()}  ${yearSeasonYear[yearSeasonYear.length-1].season.name}`)
  //     }
  //   }catch(e){

  //   }
  // }

  return(
    <> 
      <div className = "ArticleProductsGrid"
      onClick={Movementhandler}
      >
        <div className = "ArticleProductsGridLeft">
          <img src={Props.product.imageUrl}></img>
          <div className="ArticleProductsGridLeftTitle">
            {Props.product.title}
          </div>
        </div>
        <div className = "ArticleProductsGridRight">
          <div className="ArticleProductsGridRightTop">
            <div className="ArticleProductsGridRightTitle margin_bottom_list">
              {/* doneyet-1 storeでstyle保存する必要がある。 したのジャンルも*/}
              {Props.product.productStyles!=undefined?Props.product?.productStyles[0].name:""}
            </div>
            {/* {Props.product?.year!=null&&(
              <div className="ArticleProductsGridRightFlex1 margin_bottom_list">
                <div className="ArticleProductsGridRightYear">
                  {YearSeason}
                </div>
                <div className="ArticleProductsGridRightDuration">
                
                </div>
              </div>
            )} */}
            <div className="ArticleProductsGridRightArasuzi margin_bottom_list">
              <ReactQuill
              className = "preview_quill"
              value={Props.product!=undefined?Props.product.arasuzi:""} 
              theme="bubble"
              readOnly={true}
              />
            </div>
          </div>
         <div className={`ArticleProductsGridRightBottom HeaderGrid${colornumber}`}>
            <ul
            style={{margin:"0px 10px",padding:"0px",alignItems:"center"}}
            >
              {Props.product?.productGenres!=undefined&&(
                <>
                  {Props.product?.productGenres.map((item)=>{
                    return(
                      <li
                      style={{ height: "fit-content"}}
                      key={item.id}
                      >{item.name}</li>
                    )
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
})