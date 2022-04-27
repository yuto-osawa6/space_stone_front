import { useState,useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
// import { GenresList } from "./GenresList";
import Loader from "react-loader-spinner";
import { Cast } from "@/interfaces/search";
import { StudioList } from "./StudioList";


interface Props {
  handle:number
  studiosData: Studios[]
}

interface Studios{
  id:number
  company:string
}


export const StudiosLists:React.FC<Props>= (Props) =>{

  const studios = useSelector((state: RootState) => state.studios);
  const [hand, Sethand] = useState<number>(Props.handle);


  const select = (id:number):boolean =>{
    const selected = studios.studiosids.studios_id_in.includes(String(id))?true:false
    return selected
  }

  return(
    <>
      <div className = "GenresLists">
        {/* {chengecontens()} */}
        {Props.studiosData.map((item)=>{
          return(
          <> 
            <StudioList
            Studio = {item}
            select ={select(item.id)}

            />
          </>
          )
        })}
      </div>
     
      
    </>
  )
   
}