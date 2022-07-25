import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { deletingtodoGenresDataAction, pussingtodoGenresDataAction } from "@/store/todogenres/actions";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from "next/router";

interface genresdata{
  id:number
  name:string
}
interface Props {
  id:number
  name:string
  select:boolean
}

export const GenresList:React.FC<Props>= function GenresListFunc(Props){
  const [ontime,Setonime] = useState<boolean>(Props.select)
  const dispatch = useDispatch();
  const router = useRouter()
  const handleClick = (event: React.MouseEvent) => {
    Setonime(true)
    dispatch(pussingtodoGenresDataAction(String(Props.id)));
    locationchanging()
  }

  const handleDeleteClick = (event: React.MouseEvent)  =>{  
      Setonime(false)
      dispatch(deletingtodoGenresDataAction(String(Props.id)));
      locationchanging()
  }

  const locationchanging = () =>{
    if (router.pathname==="/search"){  
    }else{
      router.push(`/search`)
    }
  }
  const chengecontenslist = ()=>{
    if(ontime===true){
      return(
        <>
          <li
            onClick={handleDeleteClick}
            >
            <AiOutlineCheckCircle/>
            {Props.name}
          </li>
        </>
      )
    }if(ontime===false){
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