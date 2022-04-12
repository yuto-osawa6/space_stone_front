import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
// import { ProductReviews } from "component/products/reviews/ProductReviews";
import { Productshowcontext } from "contexttype/contexttype";
import { execProductShowReview, execSecondUpdateReview } from "lib/api/products";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useParams } from "react-router-dom";
import { RootState } from "store";
import { updateReviewAction } from "store/reviewUpdate/actions";
import { ShowCloudsItems } from "../top/ShowCloudsItems";
import { ProductReviewsItems } from "./ProductReviewsItems";

type Review = {
  content: string
  episordId: null | number
  id: number
  discribe:string
  // productId: number
  // user
}
type Props = {
  children:React.ReactNode
}

export const ProductShowReviews:React.FC<Props> = (Props) => {
  const [episords,setEpisords] = useState<string[]>([])
  const router = useRouter()
  const {pid} = router.query
  // const params = useParams();
  const params_id = pid
  const [items,setItems] = useState<Review[]>([])

  let  isMounted = true;
  const handleFirst = async() => {
    // check-3
    if (params_id==undefined) return
    const res = await  execProductShowReview(params_id as string,current,episords)
    if(res.status == 200){
      console.log(res)
      if( isMounted){
        setItems(res.data.reviews)
        GfNavigation(res.data.itemLength)
      }
    }else{

    }
  }

  // -----------------------------------------
  const props = useContext(Productshowcontext)

  // 
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
  },[current,episords])
  
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

  // ------------epi
  const handleChangeEpisords= (e:SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    setEpisords(
      typeof value === 'string' ? value.split(',') : value,
    )
    SetPage(1)
    SetCurrent(1)
  }

  console.log(episords)
  // 
  const updateReviewState = useSelector((state:RootState)=>state.updateReview)
  const userStore = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch()
  console.log(updateReviewState)
  useEffect(()=>{
    if(updateReviewState.update == false)return
    handleSecondUpdateReview()
    handleFirst()
    dispatch(updateReviewAction(false))
  },[updateReviewState])

  const handleSecondUpdateReview = async() => {
    if(props.product==undefined)return
    const res = await execSecondUpdateReview(props.product?.id,userStore.user.id)
    console.log(res)
    if(res.status==200){
      // check-1 
      if(isMounted){
        props.setUserReviews(res.data.userReview)
        props.setEmotionLists(res.data.emotionLists)
        props.setProductReviews(res.data.productReviews)
      }
    }else{

    }
  }

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
          Reviews
          </div>
          <div className="">
            {/* {props.product?.episords[0].id} */}
            <FormControl
            style={{
              width:"200px",
              marginBottom:"20px"
            }}
            size="small"
            >
            <InputLabel id="demo-simple-select-label">Episord Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={episords}
              multiple
              label="Episord Select"
              onChange={handleChangeEpisords}
              size="small"
            >
              {props.product?.episords.map((item,index)=>{
                return(
                <MenuItem value={String(item.id)} key={item.id}>{item.episord}話 {item.title}</MenuItem>
                )
              })}
            </Select>
            </FormControl>
          </div>
          
          {params_id!=undefined&&items!=undefined&&(
            <>
            {items.map((item)=>{
              return(
                // <ProductReviewsItems
                //   item = {item}
                // />
                <ShowCloudsItems
                key={item.id}
                item={item}
                productId={Number(params_id)}
                alice={true}
                >

                </ShowCloudsItems>
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