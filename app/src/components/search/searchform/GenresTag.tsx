import { useState } from "react"
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoGenresDataOneAction } from "@/store/todogenres/actions";
import { HoverClose } from "./HoverClose";
import { useRouter } from "next/router";
interface Props {
  item:number
  ishover:boolean
}

export const GenresTag:React.FC<Props> = function GenresTagFunc(Props){
  const router = useRouter()
  const genreLists = useSelector((state: RootState) => state.genres);
  const [ishover, setIshover] = useState(false);
  const dispatch = useDispatch();
  const delete_genres_handle = (id:number) => {
    dispatch(deletingtodoGenresDataOneAction(String(id)));
    if (router.pathname==="/search"){
    }else{
      router.push(`/search`)
    }
  }
 
  return(
    <>
      <div className="header-search-contents__boxes__store__list renren" 
      onClick={()=>delete_genres_handle(Props.item)}
      onMouseEnter={()=>setIshover(true)}
      onMouseLeave={()=>setIshover(false)}
      >

      {ishover &&(
        <HoverClose
        ishover = {ishover}
        />
      )}
      { genreLists.genres[Props.item-1].name}
      </div>
    </>
  )
  }