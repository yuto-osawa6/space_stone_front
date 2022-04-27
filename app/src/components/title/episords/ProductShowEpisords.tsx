import { useContext, useEffect, useState } from "react"
// import { useParams } from "react-router-dom";
import { execProductShowEpisord } from "@/lib/api/products"
import { Productshowcontext } from "@/contexttype/contexttype";
import { EpisordsItem } from "./EpisordsItem";
import { useRouter } from "next/router";

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

export const ProductShowEpisords:React.FC = () => {
  const [episords,setEpisords] = useState<Episords[]>([])
  // const params = useParams();
  // const params_id = params.productId
  const router = useRouter()
  const {pid} = router.query
  const params_id = pid

  // ----------------------------------------
  let  isMounted = true;
  const handleFirst = async() => {
    // check-3
    // check-1-next
    if (params_id==undefined) return
    const res = await execProductShowEpisord(params_id as string)
    if(res.status == 200){
      if(isMounted==true){
      console.log(res)
      setEpisords(res.data.episords)
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
  },[])

  // -----------------------------------------
  const props = useContext(Productshowcontext)
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
          Episords
          </div>
          {episords.map((item)=>{
            return(
              <EpisordsItem
                episord = {item}
                params_id = { params_id as string }
                userEmotion = {props.userReviews.filter(i=>i.episordId==item.id)[0]}
              />
            )
          })}
        
        </div>
      </div>
    </>
  )
}