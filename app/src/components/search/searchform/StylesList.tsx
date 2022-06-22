import { useRouter } from "next/router";
import { useState,useEffect, ReactChild } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store";
import { pussingtodoStylesDataAction } from "@/store/todostyles/actions";
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
    }else{
      router.push(`/search`)
    }
  }

  const handleClick = () =>{
    // Setonime(true)
    dispatch(pussingtodoStylesDataAction(String(Props.id)));
    locationchanging()
  }

  const chengecontenslist = ()=>{
    if(String(Props.id)===stylesselected.styles_id_eq){
      return(
        <>
        <li
          >
          <AiOutlineCheckCircle/>
          {Props.name}
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