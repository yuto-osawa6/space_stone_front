import { useEffect, useState } from "react"
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoGenresDataOneAction } from "@/store/todogenres/actions";
// import { useLocation, useNavigate } from "react-router";
import { HoverClose } from "../../HoverClose";
import { DeletingCastsDataOneAction } from "@/store/casts/actions";
import { Cast } from "@/interfaces/search";
import { execFindCast } from "@/lib/api/main";
import { useRouter } from "next/router";

interface Props {
  // item:number

  // ishover:boolean
  // cast:Cast
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
    // dispatch(DeletingCastsDataOneAction(String(id)),Props.item);
    if (router.pathname==="/search"){
      console.log(location.pathname)
      
    }else{
      router.push(`/search`)
    }
  }

  // useEffect(()=>{
  //   firsthandle()
  // },[])

  // const firsthandle = async() => {
  //   const res = await execFindCast(Props.item.id)
  //   console.log(res)
  //   if (res.status==200){
  //     Setcast(res.data.cast)
  //   }else{

  //   }
  // }
  console.log(CastsStore)
 
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
      
      
      {/* { genreLists.genres[Props.item-1].name} */}
      {/* {cast?.name} */}
      {Props.item.name}
      </div>
    </>
  )
  }