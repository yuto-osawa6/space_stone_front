import { UserShowContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import { execUserShowLikesProductsHandler, execUserShowScoresProductsHandler } from "@/lib/api/users"
import React, { useContext, useEffect, useState } from "react"
import { UserShowScoresProductsItem } from "./UserShowScoresProductsItem"

type score = {
  all: number
  animation: number
  character: number
  id: number
  music: number
  performance: number
  productId: number
  userId: number
  value: number
  story: number
}
export const UserShowScoresProducts:React.FC = function UserShowScoresProductsFunc(){
  // context
  const {user} = useContext(UserShowContext)
  // state
  const [product,setProduct] = useState<product[]>([])
  const [yourScores,setYourScores] = useState<score[]>([])
  const [current,SetCurrent] = useState<number>(1)
  const [page,SetPage] = useState<number>(1)
  const [scoreIndex,setScoreIndex] = useState<number>(0)

  const fistSetupHandler = async() => {
    const res = await execUserShowScoresProductsHandler(user.id,current,scoreIndex)
    if (res.status == 200){
      setProduct(res.data.products)
      setYourScores(res.data.yourSocres)
      GfNavigation(res.data.length.length)
    }else{
    }
  }
  useEffect(()=>{
    fistSetupHandler()
  },[current,scoreIndex])

  const [pageNaviGation,setPageNaviGation] = useState<number[]>([])

  const GfNavigation = (Props:number) => {
    const limit = Math.ceil(Props / 50)
    currentPage(current,limit)
    SetPage(limit)
}

  const currentPage = (i:number,c:number) => {
    if (c >= 6){

    if(i <= 3){
      setPageNaviGation([1,2,3,4,5,6])
    }else if(i == c-2){
      setPageNaviGation([i-3,i-2,i-1,i,i+1,i+2])
    }else if(i == c-1){
      setPageNaviGation([i-4,i-3,i-2,i-1,i,i+1])
    }else if(i == c){
      setPageNaviGation([i-5,i-4,i-3,i-2,i-1,i])
    }else{
      setPageNaviGation([i-2,i-1,i,i+1,i+2])
    }
  }else{
    const array:number[] = []
    for (let step = 1; step <= c; step++) {
      array.push(step)
    }
    setPageNaviGation(array)
  }
  }

  const currentSetHandler = (item:number) => {SetCurrent(item) }
  const currentPrevHandler = () => SetCurrent(current-1)
  const currentNextHandler = () => SetCurrent(current+1)
  const currentFirstHandler = () => SetCurrent(1)
  const currentMaxHandler = () => SetCurrent(page)

  // ----------------------------------
  const array = ['平均','総合','ストーリー','アニメーション','演出','音楽','キャラクター']
  const handleChangeScoreValue = (index:number) => {
    setScoreIndex(index)
    SetCurrent(1)
    SetPage(1)
  } 
  return(
    <>
      <div className = "UserShowLikesProducts">
        <div className = "UserShowLikesProductsTitle"
        style={{
          marginBottom:"0px"
        }}
        >
          評価した作品
        </div>
        <div className="ArticlesContainerNavigate"
        style={{
          borderBottom: "1px solid",
          padding: "10px",
          display: "flex"
        }}
        >
          <ul className="ArticlesContainerNavigateUl"
          style={{
            padding: "10px",
            display: "flex",
            gap:"10px",
            flexFlow: "wrap",
          }}
          >
            {array.map((item,index)=>{
              return(
                <li key={index}
                style={index==scoreIndex?{
                  backgroundColor:"#ff3073",
                  color:"white"
                }:{}}
                onClick={()=>handleChangeScoreValue(index)}
                >{item}</li>
              )
            })}
          </ul>
        </div>
        <div className = "UserShowLikesProductsMain">
          {yourScores.length!=0&&(
            <>
              {product?.map((item)=>{
                return(
                  <UserShowScoresProductsItem
                  key={item.id}
                  scoreIndex={scoreIndex}
                  product={item}
                  yourScores={yourScores.filter(i=>i.productId==item.id)[0]}
                  />
                )
              })}
          </>
          )}
        </div>
        {product?.length>0&&(
        <div className = "ArticlesContainerPage">
            <ul>
            <li
            onClick={currentFirstHandler}
            className={current==1?"activeCurrent":""}
            >1</li>
            {page>5&&current!=1&&(
              <li
              onClick={currentPrevHandler}
              >前</li>
            )}
            {pageNaviGation.map((item,index)=>
            {
              return(
                
                  <React.Fragment
                        key={index}
                        >
                  {item!=1&&item!=page&&(
                    <li
                    key={item}
                    onClick={()=>currentSetHandler(item)}
                    className={current==item?"activeCurrent":""}
                    >{item}</li>
                  )}    
                  </React.Fragment>     
      
              )
            })}
            {page>5&&current!=page&&(
              <li
              onClick={currentNextHandler}
              >次</li>
            )}
            {page>1&&(
            <li
              onClick={currentMaxHandler}
              className={current==page?"activeCurrent":""}
            >{page}</li>
            )}
            </ul>
        </div>
        )}
      </div>
    </>
  )
}