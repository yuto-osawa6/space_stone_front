import { useState } from "react"
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoGenresDataOneAction } from "store/todogenres/actions";
import { HoverClose } from "./HoverClose";
import { useRouter } from "next/router";
// import { useLocation, useNavigate } from "react-router";
// }
interface Props {
  // children:ReactChild
  item:number
  ishover:boolean
}

export const GenresTag:React.FC<Props> = (Props) =>{
  const router = useRouter()


  const genreLists = useSelector((state: RootState) => state.genres);
  const [ishover, setIshover] = useState(false);

  const dispatch = useDispatch();

  const delete_genres_handle = (id:number) => {
    dispatch(deletingtodoGenresDataOneAction(String(id)));
    if (router.pathname==="/search"){
      // console.log(location.pathname)
      
    }else{
      router.push(`/search`)
    }
  }
 
  return(
    <>
      {/* <IoIosCloseCircle/> */}
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

      {/* {ishover &&(
        <HoverClose
        ishover = {ishover}
        />
      )} */}
    </>
  )
  }