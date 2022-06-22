import { news } from "@/interfaces/main"
import { execNewMessageHandler } from "@/lib/api/mains/main_blocks";
import React, { memo, useEffect, useState } from "react";
import { GridNewMessage } from "./newmessage/GridNewMessage";

type Props = {
}
export const NewMessage:React.FC<Props> = memo(function NewMessageFunc(Props){
  let isMounted2 = true;
  const [active, setActive] = useState<number>(0);
  const [page,SetPage] = useState<number>(1)
  const [current,SetCurrent] = useState<number>(1)
  const [decisionnews,setDecisionnews] = useState<news[]>([]);
  const setupHandler = async() => {
    const res = await execNewMessageHandler(active,current)
    if (res.status === 200){
      if(isMounted2){
        setDecisionnews(res.data.decisionNews)
        GfNavigation(res.data.length)
      }
    }else{
    }
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      setupHandler()
    }, 300)
    return () => {
      clearTimeout(timer)
      isMounted2 = false;
    };
  },[active,current])
  const setActiveHandler = (item:number) =>  {
    setActive(item)
    SetCurrent(1)
  }
  //  page-------------------------------------------------------------
  const GfNavigation = (Props:number) => {
    const limit = Math.ceil(Props / 10)
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

  return(
    <>
      <div className = "NewMessageContainer">
        <div className = "NewMessageContainerRow ShareMiddleContainerTitleRow">
          <div className = "NewMessageContainerTitle share_middle_container_title">
            おしらせ
          </div>
        </div>
        <div className = "NewMessageContainerTagsSelect">
          <li
          className={active==0 ? "maintagsactive" : ""}
          onClick={()=>setActiveHandler(0)}
          >すべて</li>
          <li
          className={active==1 ? "maintagsactive" : ""}
          onClick={()=>setActiveHandler(1)}
          >#アニメ</li>
          <li
          className={active==2 ? "maintagsactive" : ""}
          onClick={()=>setActiveHandler(2)}
          >#記事</li>
          <li
          className={active==3 ? "maintagsactive" : ""}
          onClick={()=>setActiveHandler(3)}
          >#更新</li>
        </div>
        <div className = "NewMessageContainerGrid">
          {decisionnews.map((item)=>{
            return(
                <GridNewMessage
                  key={item.id}
                  news = {item}
                  tagsactive={active}
                />
              )
            })}
        </div>
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
            {pageNaviGation.map((item,index)=>{
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
    </>
  )
})