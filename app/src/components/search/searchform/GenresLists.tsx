import { useState,useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { GenresList } from "./GenresList";
import Loader from "react-loader-spinner";

interface genresdata{
  id:number
  name:string
}


interface Props {
  handle:number
  isshow:boolean
  genresdata:genresdata[]
}

interface genresdata2{
  id:number
  name:string
}


export const GenresLists:React.FC<Props>= function GenresListsFunc(Props){
  const genres = useSelector((state: RootState) => state.genres);
  const todogenres = useSelector((state: RootState) => state.todogenres);
  const [hand, Sethand] = useState<number>(Props.handle);
  const [show, Setshow] = useState<boolean>(Props.isshow);
  // Props.genresdataが入らない↓
  const [genresdata,Setgenresdata] = useState<genresdata2[]>([])
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.target
  }

  const firsthandle = ()=>{
    Setgenresdata(Props.genresdata)
  }

  useEffect(()=>{
  firsthandle()
    },[Props.genresdata])

  const select = (id:number):boolean =>{
    const selected = todogenres.janls_id_in.includes(String(id))?true:false
    return selected
  }
  const chengecontens = ()=>{
    if(genres.loaded===true){
      return(
        <>
          {Props.genresdata.map((item: genresdata)=>(
          <>
          <GenresList
            key={item.id} 
            id ={item.id}
            name ={item.name}
            select ={select(item.id)}
          />
          </>

          ))}
        </>
      )
    }else{
      
    }
  }
  return(
    <>
      <div className = "GenresLists">
        {chengecontens()}
      </div>
    </>
  )
}