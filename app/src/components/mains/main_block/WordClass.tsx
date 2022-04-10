import { ViewProductContext } from "contexttype/contexttype"
import { product } from "interfaces/product"
import React, { memo, useEffect, useRef, useState } from "react"
// import { WorldGridContainer } from "./WorldGridContainer"
import { execWorldClassHandler } from "lib/api/mains/main_blocks"
import { WorldGridContainer } from "./worldclass/WorldGridContainer"
import { WorldClassViewGrid } from "./worldclass/WorldClassViewGrid"
// import { WorldClassViewGrid } from "./worldclass/WorldClassViewGrid"


type Props = {
  // topten :product[]
  data:SSRData
}
type avgScore = {
  [k:number]:string
}

type SSRData = {
  scores: avgScore;
  worldRanking: product[];
}

export const WorldClass:React.FC<Props> = memo((Props) => {
  const [viewproduct,setViewproduct] = useState<product>()
  const [viewProductV2,setViewProductV2] = useState<product[]>(Props.data.worldRanking.length>2?[Props.data.worldRanking[Props.data.worldRanking.length-1],Props.data.worldRanking[0],Props.data.worldRanking[1]]:[]) 
  const [products,setProducts] = useState<product[]>(Props.data.worldRanking)
  const [validateProduct,setValidateProduct] = useState<boolean>(Props.data.worldRanking.length>2?true:false)
  const [useraction,setUseraction] = useState<boolean>(false)
  const intervalRef = useRef<any>(null);//1
  const [avgScore,setAvgScore] = useState<avgScore>()

  console.log(products)

  // let isMounted = true;
  // const setupHandler = async() => {
  //   const res = await execWorldClassHandler()
  //   if(res.status === 200){
  //     if(isMounted){
  //       console.log(res)
  //       setProducts(res.data.worldRanking)
  //       if (res.data.worldRanking.length>2){
  //       setValidateProduct(true)
  //       setViewProductV2([res.data.worldRanking[res.data.worldRanking.length-1],res.data.worldRanking[0],res.data.worldRanking[1]])
  //       setAvgScore(res.data.scores.avgScore)
  //       }
  //     }
  //   }else{

  //   }
  // }

  // useEffect(()=>{
  //   const timer = setTimeout(() => {
  //     setupHandler()
  //   }, 300)
  //   return () => {
  //     clearTimeout(timer)
  //     isMounted = false;
  //   };
  // },[])

  // -------------------------------------------------------------

  let i = 0
  let avige:any
  useEffect(() => {
    if(useraction==true){
      console.log("aaa")
      return
    }
    if (intervalRef.current !== null) {
      return;
    }
    if (products == undefined) return
    if (products?.length == 0) return
    // intervalRef.current 
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


  // useEffect(()=>{
  //   // clearInterval(intervalRef.current)
  //   clearInterval(avige)
  // },[useraction])

  return(
    <>
      {validateProduct==true&&(
        <div className = "WorldClassContainer"
        >
          <div className = "WorldClassContainerRow">
            <div className = "WorldClassContainerTitle share_middle_container_title">
              映画情報（1年前〜1年後）
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
    </>
  )
})