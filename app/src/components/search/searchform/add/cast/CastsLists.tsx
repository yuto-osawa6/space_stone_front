import { useState,useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "store";
// import { GenresList } from "./GenresList";
import Loader from "react-loader-spinner";
import { Cast } from "interfaces/search";
import { CastList } from "./CastList";

interface genresdata{
  id:number
  name:string
}

interface Props {
  handle:number
  // isshow:boolean
  CastsData:Cast[]
}

interface genresdata2{
  id:number
  name:string
}

export const CastsLists:React.FC<Props>= (Props) =>{

  const casts = useSelector((state: RootState) => state.cast);

  // const genres = useSelector((state: RootState) => state.genres);
  // const todogenres = useSelector((state: RootState) => state.todogenres);

  // console.log(genresdata)
  const [hand, Sethand] = useState<number>(Props.handle);
  // const [show, Setshow] = useState<boolean>(Props.isshow);
  // Props.genresdataが入らない↓
  // const [genresdata,Setgenresdata] = useState<genresdata2[]>([])


 

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.target
    console.log(event)
  }

  const select = (id:number):boolean =>{
    const selected = casts.castids.casts_id_in.includes(String(id))?true:false
    return selected
  }

  // const firsthandle = ()=>{
  //   Setgenresdata(Props.genresdata)
  // }

  // useEffect(()=>{
  // firsthandle()
  //   },[Props.genresdata])


  // const select = (id:number):boolean =>{
  //   const selected = todogenres.janls_id_in.includes(String(id))?true:false
  //   return selected
  // }


  // const chengecontens = ()=>{
  //   // if(Props.isshow===true){
  //   if(genres.loaded===true){
  //     return(
  //       <>
         

  //         {Props.genresdata.map((item: genresdata)=>(
  //         <>
  //         <GenresList
  //           key={item.id} 
  //           id ={item.id}
  //           name ={item.name}
  //           select ={select(item.id)}
  //         />
  //         </>

  //         ))}
        
  //       </>
  //     )
  //   }else{
      
  //   }
  // }
  return(
    <>
      <div className = "GenresLists">
        {/* {chengecontens()} */}
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