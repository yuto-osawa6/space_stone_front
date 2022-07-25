import { product } from "@/interfaces/product"
import { memo, useEffect, useState } from "react"
import { IoTimer } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { actionSettingProductData2 } from "@/store/product/actions"
import { useRouter } from "next/router"
import { useStyleJa } from "@/hook/useStyle"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  product:product
}
export const ArticleProductList:React.FC<Props> = memo(function ArticleProductList(Props){
  const [colornumber,setColornumber ]= useState<number>(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const Movementhandler = () => {
    if(Props.product==undefined)return
    dispatch(actionSettingProductData2(Props.product))
    router.push(`/title/${Props.product?.id}`)
  }

  useEffect(()=>{
  },[])

  const [YearSeason,setYearSeason]= useState<string>("")

  const {nameStyle} = useStyleJa(Props.product.productStyles!=undefined?Props.product?.productStyles[0].name:"")
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
              {nameStyle}
            </div>
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