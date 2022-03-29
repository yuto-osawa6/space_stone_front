import React, { useEffect, useRef, useState } from "react"
// import { news, tags } from "";

// import { news, tags } from "src/interfaces/main";
// import { product } from "src/interfaces/product";

// import { execMain } from "lib/api/main";
// import { product } from "../../interfaces/product";
// import { NewNetflix } from "./main_block/NewNetflix";
// import { NewMessage } from "./main_block/NewMessage";
// import { news, tags } from "interfaces/main";
// import { PickUp } from "./main_block/PickUp";
// import { CalendarProduct } from "./main_block/Calendar";
// import { WorldClass } from "./main_block/WordClass";
// import { Tags } from "./main_block/Tags";
// import { MainPopularReviewAndThreads } from "./main_block/MainPopularReviewsAndThreads";
// import { useLocation } from "react-router-dom";
// import { WeeklyRanking } from "./main_block/WeeklyRanking";
// import { Toptens2 } from "./main_block/topten/Toptens2";

const Main:React.FC = () =>{
  const [decisionnews,setDecisionnews] = useState<news[]>([]);
  // const [pickups,setPickups] = useState<product[]>([]);
  // const [deliveryend,setDeliveryend] = useState<product[]>([]);
  // const [deliverystart,setDeliverystart] = useState<product[]>([]);
  // const [topten,setTopten] = useState<product[]>([]);
  // const [tags,setTags] = useState<tags[]>([])
  // const [tagsTop100,setTagsTop100] = useState<tags[]>([])

  // let isMounted = true;
  // const handleExec = async() => {
  //   const res = await execMain()
  //   if (res.status === 200) {
  //     if(isMounted){
  //       setTags(res.data.tags)
  //       setTagsTop100(res.data.top100)
  //       setload(true)
  //     }
  //   }
  // }
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handleExec()
  //     // setRight(ref.current.getBoundingClientRect().right)
  //   }, 300)
  //   return () => {
  //     clearTimeout(timer)
  //     isMounted = false;
  //   };
  // }, [])
  // // location scroll-------------------------------
  // const location = useLocation()
  // useEffect(()=>{
  //   if (location.hash) {
  //     let elem = document.getElementById(location.hash.slice(1))
  //     if(elem==null)return
  //       const top = elem.getBoundingClientRect().top
  //     if (elem) {
  //       top<0?window.scrollTo({top:top + window.pageYOffset-66.8,left:0, behavior: "smooth"}):window.scrollTo({top:top + window.pageYOffset-20,left:0, behavior: "smooth"})
  //     }
  //   } else {
  //   window.scrollTo({top:0,left:0, behavior: "smooth"})
  //   }
  // },[location,])



  return(
    <>
      <div className = "mainContents share_middle_container01">
        {/* <div>
          <WeeklyRanking
          />
        </div> */}
        <div id = "a">
        {/* <NewNetflix
        /> */}
        </div>
        {/* <PickUp
          products ={ pickups }
        /> */}

         {/* <div id = "d">
        <WorldClass
          topten = { topten }
        />
        </div>
        
         <div id = "e">
        <NewMessage
          news = { decisionnews }
        />
        </div>
        
        <div id = "f">
        <CalendarProduct
          end = { deliveryend }
          start = {deliverystart}
        />
        </div>

    
 
        <div id = "g">
      
         <Toptens2
        />
        </div>
        <Tags
        tags = {tags}
        tagsTop100 = {tagsTop100}
        />

        <MainPopularReviewAndThreads/> */}
      </div>
    </>
  )
}
export default Main
