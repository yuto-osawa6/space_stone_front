import { useEffect, useState } from "react"
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoGenresDataOneAction } from "@/store/todogenres/actions";
// import { useLocation, useNavigate } from "react-router";
import { DeletingCastsDataOneAction } from "@/store/casts/actions";
import { Cast } from "@/interfaces/search";
import { execFindCast } from "@/lib/api/main";
import { deletingtodoStudiosDataOneAction } from "@/store/studios/actions";
import { HoverClose } from "../HoverClose";
import { useRouter } from "next/router";

interface Studios{
  id:number
  company:string
}

interface Props {
  item:Studios
}



export const StudiosTag:React.FC<Props> = function StudiosTagFunc(Props){
  const router = useRouter()

  
  const [cast,Setcast] = useState<Cast>() 

  // const StudiosStore = useSelector((state: RootState) => state.studios);
  const [ishover, setIshover] = useState(false);

  const dispatch = useDispatch();

  const delete_genres_handle = (id:number) => {
    dispatch(deletingtodoStudiosDataOneAction(String(id),Props.item));
    // dispatch(DeletingCastsDataOneAction(String(id)),Props.item);
    if (router.pathname==="/search"){
      // console.log(location.pathname)
      
    }else{
      router.push(`/search`)
    }
  }

  // console.log(CastsStore)
 
  return(
    <>
      <div className="header-search-contents__boxes__store__list renren" 
      onClick={()=>delete_genres_handle(Props.item.id)}
      onMouseEnter={()=>setIshover(true)}
      onMouseLeave={()=>setIshover(false)}
      >

      {ishover &&(
        <HoverClose
        ishover = {ishover}
        />
      )}
      
    
      {Props.item.company}
      </div>
    </>
  )
  }