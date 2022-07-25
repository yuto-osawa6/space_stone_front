import React, { useContext, useEffect, useState } from "react"
import { execProductShowEpisord } from "@/lib/api/products"
import { Productshowcontext } from "@/contexttype/contexttype";
import { EpisordsItem } from "./EpisordsItem";
import { useRouter } from "next/router";
import { useUser } from "@/lib/data/user/useUser";
import { CreateEpisord } from "./admin/CreateEpisord";

type emotions = {
  id:number
  emotion: string
  length:number
}
type week = {
  array: weekly_rankings[]
  id: number
  week: string
}
type weekly_rankings = {
  count: number
  id: number
  productId: number
  weekId: number
  weekly: string
}

type Episords = {
  id: number
  arasuzi:string
  image:string
  releaseDate: string
  time: string
  title: string
  episord:number
  emotions:emotions[]
  weeks:week[]
}

export const ProductShowEpisords:React.FC = function ProductShowEpisordsFunc(){
  const [episords,setEpisords] = useState<Episords[]>([])
  const router = useRouter()
  const {pid} = router.query
  const params_id = pid
  const [current,SetCurrent] = useState<number>(1)
  const [page,SetPage] = useState<number>(1)

  // ----------------------------------------
  let  isMounted = true;
  const handleFirst = async() => {
    if (params_id==undefined) return
    const res = await execProductShowEpisord(params_id as string,current)
    if(res.status == 200){
      if(isMounted==true){
      setEpisords(res.data.episords)
      GfNavigation(res.data.episordsLength)
      }
    }else{

    }
  }

  useEffect(()=>{
    const timer = setTimeout(() => {
      handleFirst()
    }, 300)
    return () => {
      clearTimeout(timer)
      isMounted = false;
    }
  },[current])

  // -------------------------------------------

  const GfNavigation = (Props:number) => {
    const limit = Math.ceil(Props / 50)
    currentPage(current,limit)
    SetPage(limit)
  }
  
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

  // -----------------------------------------
  const props = useContext(Productshowcontext)
  // 
  const {userSwr} = useUser()
  const [open,setOpen] = useState<boolean>(false)

  const handleOpenAddEpisord = () => {
    setOpen(true)
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
            fontWeight:"bold",
            display:"flex",
            justifyContent:"space-between"
          }
          }
          >
          Episords
          {userSwr.user.administratorGold == true && (
            <>
              <div className=""
              onClick={handleOpenAddEpisord}
              >Update&&Delete</div>
            </>
          )}
          </div>
          {episords.map((item)=>{
            return(
              <EpisordsItem
                key = {item.id}
                episord = {item}
                params_id = { params_id as string }
                userEmotion = {props.userReviews.filter(i=>i.episordId as number==item.id)[0]}
              />
            )
          })}
          <div className = "ArticlesContainerPage"
          style = {{position: "relative"}}
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
        
        </div>
      </div>
      {open&&(
        <CreateEpisord
        open = {open}
        setOpen = {setOpen}
        />
      )}
    </>
  )
}