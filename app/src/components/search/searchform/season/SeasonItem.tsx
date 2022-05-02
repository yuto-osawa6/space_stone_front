// import { Select } from "@mui/material";
import { useRouter } from "next/router";
import { useState,useEffect, ReactChild } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useNavigate } from "react-router";
import { RootState } from "@/store";
import { pussingtodoKisetsuDataAction } from "@/store/kisetsu/actions";
import { pussingtodoStylesDataAction } from "@/store/todostyles/actions";

// }
type Kisetsu = {
  id:number
  name:string
}
interface Props {
  kisetsu:Kisetsu
  select:boolean
}


export const SeasonItem:React.FC<Props> = function SeasonItemFunc(Props){
  const [ontime,Setonime] = useState<boolean>(Props.select)

  const stylesselected = useSelector((state: RootState) => state.todostyles);

  const router = useRouter()

  const dispatch = useDispatch();

  const locationchanging = () =>{
    if (router.pathname==="/search"){
      console.log("a")
      // console.log(location.pathname)
      
    }else{
      console.log("b")
      router.push(`/search`)
    }
  }
  
  const handleClick = () =>{
    dispatch(pussingtodoKisetsuDataAction(String(Props.kisetsu.id),Props.kisetsu));
    locationchanging()
    // console.log(stylesselected)
  }

  const chengecontenslist = ()=>{
    console.log(Props.kisetsu.id)
    if(Props.select){
      return(
        <>
         <li
          >
          <AiOutlineCheckCircle/>
          {Props.kisetsu.name}
         </li>
        </>
      )
    }
   else{
      return(
      <li
        onClick={handleClick}
        >
        {Props.kisetsu.name}
      </li>
      )
    }
  }

  return(
    <>
      {chengecontenslist()}
    </>
  )
  }