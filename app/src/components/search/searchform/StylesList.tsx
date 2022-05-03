import { useRouter } from "next/router";
import { useState,useEffect, ReactChild } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useNavigate } from "react-router";
import { RootState } from "@/store";
import { pussingtodoStylesDataAction } from "@/store/todostyles/actions";

// }
interface Props {
  id:number
  name:string
  select:boolean
}

type styleslists={
  id:number
  name:string
}

export const StylesList:React.FC<Props> = function StylesListFunc(Props){
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
  
  // const handleDeleteClick = () => {
  //   // Setonime(false)
  //   locationchanging()
  //   dispatch(pussingtodoStylesDataAction(String(Props.id)));
  //   console.log(stylesselected)
  // }

  const handleClick = () =>{
    // Setonime(true)
    dispatch(pussingtodoStylesDataAction(String(Props.id)));
    locationchanging()
    console.log(stylesselected)
  }

  const chengecontenslist = ()=>{
    console.log(Props.id)
    if(String(Props.id)===stylesselected.styles_id_eq){
      return(
        <>
         <li
          // onClick={handleDeleteClick}
          >
          <AiOutlineCheckCircle/>
          {Props.name}
          {/* {stylesselected.styles_id_eq} */}
         </li>
        </>
      )
    }
   else{
      return(
      <li
     
        onClick={handleClick}
        >
        {Props.name}
        {/* {stylesselected.styles_id_eq} */}
      </li>
      )
    }
  }
  // useEffect(()=>{
  //   chengecontenslist()
  // },[stylesselected])
  return(
    <>
      {chengecontenslist()}
      {/* <li
      onClick={handleClick}
      >{Props.name}
      </li> */}
    </>
  )
  }