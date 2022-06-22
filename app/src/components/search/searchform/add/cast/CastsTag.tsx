import { useEffect, useState } from "react"
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoGenresDataOneAction } from "@/store/todogenres/actions";
import { HoverClose } from "../../HoverClose";
import { DeletingCastsDataOneAction } from "@/store/casts/actions";
import { Cast } from "@/interfaces/search";
import { execFindCast } from "@/lib/api/main";
import { useRouter } from "next/router";

interface Props {
  item:Cast
}



export const CastsTag:React.FC<Props> = function CastsTagFunc(Props){
  const router = useRouter()
  const [cast,Setcast] = useState<Cast>() 
  const CastsStore = useSelector((state: RootState) => state.cast);
  const [ishover, setIshover] = useState(false);
  const dispatch = useDispatch();
  const delete_genres_handle = (id:number) => {
    dispatch(DeletingCastsDataOneAction(String(id),Props.item));
    if (router.pathname==="/search"){  
    }else{
      router.push(`/search`)
    }
  }
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
      {Props.item.name}
      </div>
    </>
  )
  }