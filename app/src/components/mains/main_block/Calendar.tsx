import Calendar from '@fullcalendar/react'
import FullCalendar,{ EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // pluginは、あとから
import { product } from "@/interfaces/product";
import { OpenContext } from "@/contexttype/contexttype";
import { useEffect, useState } from "react";
import listPlugin from '@fullcalendar/list';
import { execCalendarHandler } from "@/lib/api/mains/main_blocks";
import { CalendarEventsModal } from "./calender/CalenderEventsModal";
type Props = {
  calendarData: {
    deliveryStart: product[];
    episordStart: product[];
    scores: avgScore;
  }
}
type avgScore = {
  [k:number]:string
}
export const CalendarProduct:React.FC<Props> = function CalendarProductFunc(Props){
  const[startProduct,setStartProduct] = useState<product[]>()
  const[product,setProduct] = useState<product>()
  const[productEpisord,setProductEpisord] = useState<product[]>()
  const [avgScore,setAvgScore] = useState<avgScore>(Props.calendarData.scores)

  // let isMounted2 = true;
  // const setupHandler = async() => {
  //   const res = await execCalendarHandler()
  //   if(res.status === 200){
  //     console.log(res)
  //     // setEndProduct(res.data.deliveryEnd)
  //     if(isMounted2){
  //       setStartProduct(res.data.deliveryStart)
  //       setProductEpisord(res.data.episordStart)
  //       setAvgScore(res.data.scores.avgScore)
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
  //     isMounted2 = false;
  //   };
  // },[])

  const [open, setOpen] = useState<boolean>(false)
  const array:any[] = []
  // endProduct?.map((item)=>{
  //   array.push({title:item.title,date:item.deliveryEnd,color:"#132f4c",arasuzi:"aaaaaaa",url:`products/${item.id}`,product:item})
  // })
  Props.calendarData.episordStart?.map((item)=>{
    var today = new Date(item.productEpisord.releaseDate as Date);
    const date = `${today.getFullYear()}-${("00"+(today.getMonth()+1)).slice( -2 )}-${("00"+today.getDate()).slice( -2 )}`
    array.push({title:`${item.title} ${item.productEpisord.episord}話`,date:date,color:"#132f4c",arasuzi:"aaaaaaa",url:`products/${item.id}`,product:item})
  })
  // startProduct?.map((item)=>{
  //   array.push({title:item.title,date:item.deliveryStart,color:"#ff3073",url:`/products/${item.id}`,product:item})
  // })
  const handleEvent = (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
    setProduct(clickInfo.event._def.extendedProps.product)
    // setAvgScoreOne(avgScore[clickInfo.event._def.extendedProps.product.id])
    setOpen(true)
  }
  const today_month1 = new Date()
  const today_month2 = new Date()
  today_month1.setMonth(today_month1.getMonth() + 4);
  today_month2.setMonth(today_month2.getMonth() - 2);

  const month1 = today_month1.getMonth()
  const year1 =  today_month1.getFullYear()
  const month2 = today_month2.getMonth()
  const year2 =  today_month2.getFullYear()

  const today_year = new Date().getFullYear()
  // const mouseEnterHandler = (arg: EventHoveringArg) => {
  //   console.log(arg.event)
  // }
  return(
    <>
    <div className = "CalendarContainer">
      <div className = "CalendarContainerRow">
        <div className = "CalendarContainerTitle share_middle_container_title">
          放送情報,映画情報
          <div className = "CalendarContainerTagsExplain">
          </div>
        </div>
        <div className = "CalendarContainerRowAction share_middle_container_right_text">
          <li className = "CalendarContainerTagsExplainEnd"><p></p>配信終了</li>
          <li className = "CalendarContainerTagsExplainStart"><p></p>配信開始</li>
        </div>
      </div>
      <div className = "CalendarContainerComponent">
      <FullCalendar
      plugins={[dayGridPlugin,listPlugin]} 
      headerToolbar={{
        end: 'today dayGridMonth,dayGridWeek,listWeek,prev,next',
      }}
      // nowIndicator={true}
      // editable={true}
      initialView="listWeek" 
      locale="ja"
      events={array}
      dayMaxEvents={true}
      validRange={{start:`${year2}-${("0"+(month2)).slice( -2 )}-01`,end:`${year1}-${("0"+(month1)).slice( -2 )}-01`}}
      // eventMouseEnter={mouseEnterHandler}
      eventClick={handleEvent}
      />
      {/* <Calendar
        plugins={[dayGridPlugin]}
        locale="ja"
        initialEvents={[{ title: 'initial event', start: new Date() }]}
      /> */}
      </div>
      </div>
      {open&&product!=undefined&&(
        <OpenContext.Provider value={{ open, setOpen }}>
          <CalendarEventsModal
            product = {product}
            avgScore = {avgScore!=undefined?avgScore[product.id]!=undefined?avgScore[product.id]:undefined:undefined}
          />
        </OpenContext.Provider>
      )}
    </>
  )
}