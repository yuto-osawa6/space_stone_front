import { UserShowContext } from "@/contexttype/contexttype"
import { product } from "@/interfaces/product"
import { execUserShowLikesProductsHandler } from "@/lib/api/users"
import React, { useContext, useEffect, useState } from "react"
import { UserShowLikesGenres } from "./UserShowLikesGenres"
import { UserShowLikesProductsItem } from "./UserShowLikesProductsItem"

export const UserShowLikesProducts:React.FC = function UserShowLikesProductsFunc(){
  // context
  const {user} = useContext(UserShowContext)
  // state
  const [product,setProduct] = useState<product[]>([])
  const [current,SetCurrent] = useState<number>(1)
  const [page,SetPage] = useState<number>(1)

  const fistSetupHandler = async() => {
    const res = await execUserShowLikesProductsHandler(user.id,current)
    if (res.status == 200){
      console.log(res)
      setProduct(res.data.product)
      GfNavigation(res.data.length)
    }else{

    }
  }

  useEffect(()=>{
    fistSetupHandler()
  },[current])

  const [pageNaviGation,setPageNaviGation] = useState<number[]>([])

  const GfNavigation = (Props:number) => {
    const limit = Math.ceil(Props / 2)
    // console.log(limit)
    currentPage(current,limit)
    SetPage(limit)
}

  const currentPage = (i:number,c:number) => {
    // console.log(i,c)
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
  return(
    <>
      <div className = "UserShowLikesProducts">
        <div className = "UserShowLikesProductsTitle">
          お気に入り作品
        </div>
        <div className = "UserShowLikesProductsMain">
          {product?.map((item)=>{
            return(
              <UserShowLikesProductsItem
              product={item}
              />
            )
          })}
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
              // console.log(item!=1&&(item!=page||page!=1))
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
         
            <UserShowLikesGenres
              
            />
        

      </div>
      
    </>
  )
}