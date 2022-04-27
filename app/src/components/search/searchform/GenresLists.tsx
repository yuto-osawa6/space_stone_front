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
  // id:number
  // name:string
  handle:number
  isshow:boolean
  genresdata:genresdata[]
}
// interface Props2 {
//   isshow:boolean
// }

interface genresdata2{
  id:number
  name:string
}

// const ini:genresdata2 ={0:[
//   id:1,
//   name:"a"]
// }

export const GenresLists:React.FC<Props>= (Props) =>{
  // console.log(Props.genresdata)
  // console.log(Props)
  // console.log(hand)
  const genres = useSelector((state: RootState) => state.genres);

  const todogenres = useSelector((state: RootState) => state.todogenres);

  // console.log(genresdata)
  const [hand, Sethand] = useState<number>(Props.handle);
  const [show, Setshow] = useState<boolean>(Props.isshow);
  // Props.genresdataが入らない↓
  const [genresdata,Setgenresdata] = useState<genresdata2[]>([])
  // genreListsStore
  // console.log(genresdata)
  // console.log(hand)
  // console.log(genresdata)



 

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.target
    console.log(event)
    // const value = e.target
    // console.log(genresdata)
  }

  const firsthandle = ()=>{
    Setgenresdata(Props.genresdata)
  }

  useEffect(()=>{
  firsthandle()
    },[Props.genresdata])

  // const handleClick= (e.)

  const select = (id:number):boolean =>{
    const selected = todogenres.janls_id_in.includes(String(id))?true:false
    return selected
  }


  const chengecontens = ()=>{
    console.log(Props.isshow)
    // if(Props.isshow===true){
    if(genres.loaded===true){
      return(
        <>
         

          {Props.genresdata.map((item: genresdata)=>(
            // const name ="aa"
          <>
          <GenresList
            // onclick = {handleClick}
            key={item.id} 
            id ={item.id}
            name ={item.name}
            select ={select(item.id)}
            // imageUrl ={item.imageUrl}
          />
          </>

          ))}
          {/* <Loader
   type="Puff"
   color="#00BFFF"
   height={100}
   width={100}
  //  timeout={3000} //3 secs
/> */}
        </>
      )
    }else{
      
    }
  }
  // useEffect(()=>{
  //   chengecontens()
  // },[Props.isshow])

  // if (show===true){
  return(
    <>
      {/* <li>{console.log(show)}</li> */}
      {/* <li>{genresdata.length}</li> */}
      {/* {console.log(genresdata)} */}
      {/* {if ({show}===true){

      }} */}
      {/* aaaaaaa */}
      <div className = "GenresLists">
        {chengecontens()}
      </div>
      {/* aaaaaaaaaa */}
      
    </>
  )
    // }
  // if(show===false){
  //   return(
  //     <>
  //       {/* <li>{console.log(show)}</li> */}
  //       {/* <li>{genresdata.length}</li> */}
  //       {/* {console.log(genresdata)} */}
  //       {/* {if ({show}===true){
  
  //       }} */}
        
        
  //     </>
  // }
}