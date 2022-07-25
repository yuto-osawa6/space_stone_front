import { useState,useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Loader from "react-loader-spinner";
import { Cast } from "@/interfaces/search";
import { CastList } from "./CastList";

interface genresdata{
  id:number
  name:string
}
interface Props {
  handle:number
  CastsData:Cast[]
}
interface genresdata2{
  id:number
  name:string
}

export const CastsLists:React.FC<Props>= function CastsLists(Props){

  const casts = useSelector((state: RootState) => state.cast);
  const [hand, Sethand] = useState<number>(Props.handle); 
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.target
  }

  const select = (id:number):boolean =>{
    const selected = casts.castids.casts_id_in.includes(String(id))?true:false
    return selected
  }
  return(
    <>
      <div className = "GenresLists">
        {Props.CastsData.map((item)=>{
          return(
          <> 
            <CastList
            Cast = {item}
            select ={select(item.id)}
            />
          </>
          )
        })}
      </div>
    </>
  )
}