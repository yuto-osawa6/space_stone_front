import { Cast } from "@/interfaces/search"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"
import { DeletingCastsDataAction, PussingCastsDataAction } from "@/store/casts/actions"

type Props = {
  Cast:Cast
  select:boolean
}

export const CastList:React.FC<Props> = function CastListFunc(Props){
  // state
  const [Select,SetSelect] = useState<boolean>(Props.select)
  const dispatch = useDispatch()

  const router = useRouter()

  const locationchanging = () =>{
    if (router.pathname==="/search"){
      console.log("a")
      
    }else{
      console.log("b")
      router.push(`/search`)
    }
  }


  const handleClick = (event: React.MouseEvent) => {
    SetSelect(true)
    dispatch(PussingCastsDataAction(String(Props.Cast.id),Props.Cast));
    locationchanging()
    
  }

  const handleDeleteClick = (event: React.MouseEvent)  =>{  
    SetSelect(false)
    dispatch(DeletingCastsDataAction(String(Props.Cast.id),Props.Cast));
    locationchanging()
  }


  return (
    <>
      {Select===false?
      <>
        <li
          onClick={handleClick}
          >
          {Props.Cast.name}
        </li>
      </>
      :
      <>
        <li
          onClick={handleDeleteClick}
          >
            <AiOutlineCheckCircle/>
          {Props.Cast.name}
        </li>
      </>
      }
      
    </>
  )
}