import { Cast } from "interfaces/search"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"
import { DeletingCastsDataAction, PussingCastsDataAction } from "store/casts/actions"
import { deletingtodoStudiosDataAction, pussingtodoStudiosDataAction } from "store/studios/actions"

type Props = {
  Studio:Studios
  select:boolean
}

interface Studios{
  id:number
  company:string
}

export const StudioList:React.FC<Props> = (Props) => {
  // state
  const [Select,SetSelect] = useState<boolean>(Props.select)
  const dispatch = useDispatch()

  const router = useRouter()


  const locationchanging = () =>{
    if (router.pathname==="/search"){
      console.log("a")
      // console.log(location.pathname)
      
    }else{
      console.log("b")
      router.push(`/search`)
    }
  }


  const handleClick = (event: React.MouseEvent) => {
    SetSelect(true)
    dispatch(pussingtodoStudiosDataAction(String(Props.Studio.id),Props.Studio));
    locationchanging()
    
  }

  const handleDeleteClick = (event: React.MouseEvent)  =>{  
    SetSelect(false)
    dispatch(deletingtodoStudiosDataAction(String(Props.Studio.id),Props.Studio));
    locationchanging()
  }


  return (
    <>
      {Select===false?
      <>
        <li
          onClick={handleClick}
          >
          {Props.Studio.company}
        </li>
      </>
      :
      <>
        <li
          onClick={handleDeleteClick}
          >
            <AiOutlineCheckCircle/>
          {Props.Studio.company}
        </li>
      </>
      }
      
    </>
  )
}