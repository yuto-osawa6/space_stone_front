// import { ProductReviews } from "component/products/reviews/ProductReviews";
import { Productshowcontext } from "contexttype/contexttype";
import { execProductShowReview, execProductShowThread } from "lib/api/products";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
// import { Outlet, useParams } from "react-router-dom";
import { ShowCloudsItems } from "../top/ShowCloudsItems";
import { ShowCloudsItems2 } from "../top/ShowCloudsItems2";
// import { ProductReviewsItems } from "./ProductReviewsItems";

type Review = {
  content: string
  title:string
  id: number
  discribe:string
}

type Props = {
  children:ReactNode
}

export const ProductShowThreads:React.FC<Props> = (Props) => {
  const [episords,setEpisords] = useState<string[]>([])
  const router = useRouter()
  const {pid} = router.query
  const params_id = pid
  const [items,setItems] = useState<Review[]>([])

  let isMounted = true;
  const handleFirst = async() => {
    // check-3
    if (params_id==undefined) return
    const res = await  execProductShowThread(params_id as string,current)
    if(res.status == 200){
      console.log(res)
      if(isMounted){
        setItems(res.data.threads)
        GfNavigation(res.data.itemLength)
      }
    }else{

    }
  }

  useEffect(()=>{
    handleFirst()
  },[])

  // -----------------------------------------
    const props = useContext(Productshowcontext)

    const GfNavigation = (Props:number) => {
      const limit = Math.ceil(Props / 2)
      // console.log(limit)
      currentPage(current,limit)
      SetPage(limit)
    }
  
    const [page,SetPage] = useState<number>(1)
    const [current,SetCurrent] = useState<number>(1)
  
    useEffect(()=>{
      const timer = setTimeout(() => {
        handleFirst()
      }, 500)
      return () => {
        isMounted = false;
        clearTimeout(timer)
      }
    },[current])
    
    const [pageNaviGation,setPageNaviGation] = useState<number[]>([])
    
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
  

  return(
    <>
     <div className = {`show_top_contens`}> 
        <div className = {`show_top_dummy p_contens_grid_color${props.switchnumber}`}>
        </div>
        <div className="Overview">
          <div className = "OverviewTitle"
          style={{fontSize: "1.2rem",
            marginBottom: "20px",
            position: "relative",
            fontWeight:"bold"
          }
          }
          >
          Threads
          </div>
          
          {params_id!=undefined&&items!=undefined&&(
            <>
            {items.map((item)=>{
              return(
                // <ProductReviewsItems
                //   item = {item}
                // />
                <ShowCloudsItems2
                key={item.id}
                item={item}
                productId={Number(params_id)}
                alice={true}
                >

                </ShowCloudsItems2>
              )
            })}
          </>
          )}
         
        
        </div>

        <div className = "ArticlesContainerPage"
        style={{position:"relative"}}
        >
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
      
          {/* <Outlet/> */}
          {Props.children}
      </div>
    </>
  )
}