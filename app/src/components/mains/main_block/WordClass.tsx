import { ViewProductContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import React, { memo, useEffect, useRef, useState } from "react"
import { execWorldClassHandler } from "@/lib/api/mains/main_blocks"
import { WorldGridContainer } from "./worldclass/WorldGridContainer"
import { WorldClassViewGrid } from "./worldclass/WorldClassViewGrid"


type Props = {
  data:SSRData
}
type avgScore = {
  [k:number]:string
}

type SSRData = {
  scores: avgScore;
  worldRanking: product[];
}

export const WorldClass:React.FC<Props> = memo(function WorldClassFunc(Props){
  const [viewproduct,setViewproduct] = useState<product>()
  const [viewProductV2,setViewProductV2] = useState<product[]>(Props.data.worldRanking.length>2?[Props.data.worldRanking[Props.data.worldRanking.length-1],Props.data.worldRanking[0],Props.data.worldRanking[1]]:[]) 
  const [products,setProducts] = useState<product[]>(Props.data.worldRanking)
  const [validateProduct,setValidateProduct] = useState<boolean>(Props.data.worldRanking.length>2?true:false)
  const [useraction,setUseraction] = useState<boolean>(false)
  const intervalRef = useRef<any>(null);//1
  const [avgScore,setAvgScore] = useState<avgScore>()

  // -------------------------------------------------------------

  let i = 0
  let avige:any
  useEffect(() => {
    if(useraction==true){
      return
    }
    if (intervalRef.current !== null) {
      return;
    }
    if (products == undefined) return
    if (products?.length == 0) return
    const avige = setInterval(() => {     
        if (i >= products.length){
          i = 0
        }
        if(i==0){
          setViewProductV2([products[products.length-1],products[i],products[1]])
        }else if(i == products.length-1){
          setViewProductV2([products[i-1],products[i],products[0]])
        }else{
          setViewProductV2([products[i-1],products[i],products[i+1]])
        }
        setViewproduct(products[i])
        i += 1
      }, 4000);
    return () => { clearInterval(avige) };

  }, [products,useraction]);

  return(
    <div>
      {validateProduct==true&&(
        <div className = "WorldClassContainer"
        >
          <div className = "WorldClassContainerRow">
            <div className = "WorldClassContainerTitle share_middle_container_title">
              映画情報(今シーズン)
            </div>
            <div className = "WorldClassContainerRowAction share_middle_container_right_text">
            </div>
          </div>
        <div className = "WorldClassContainerGrid">
          {Props.data.worldRanking?.map((item,index)=>{
            return(
              <React.Fragment key={item.id}>
                <ViewProductContext.Provider value={{ viewproduct, setViewproduct,useraction,setUseraction,viewProductV2,setViewProductV2,products}}>
                <WorldGridContainer
                index={index}
                product={item}
                />
                </ViewProductContext.Provider>
              </React.Fragment>
            )
          })}
        </div>
        <div className = "WorldClassContainers">
          {viewProductV2?.map((item)=>{
            return(
              <WorldClassViewGrid
              key={item.id}
              product = {item}
              avgScore = {Props.data.scores!=undefined?Props.data.scores[item.id]!=undefined?Props.data.scores[item.id]:undefined:undefined}
              />
            )
          })}
        </div>
      </div>
      )}
    </div>
  )
})