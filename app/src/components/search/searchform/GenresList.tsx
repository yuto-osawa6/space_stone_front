import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { deletingtodoGenresDataAction, pussingtodoGenresDataAction } from "store/todogenres/actions";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useRouter } from "next/router";
// import { useLocation, useNavigate } from "react-router";

interface genresdata{
  id:number
  name:string
}


interface Props {
  id:number
  name:string
  select:boolean
  // onclick:Function
}




export const GenresList:React.FC<Props>= (Props) =>{
  // const [data, Setdata] = useState<Props>(Props);
  const [ontime,Setonime] = useState<boolean>(Props.select)
  // const todogenres = useSelector((state: RootState) => state.todogenres);
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
      console.log("a")
      // console.log(location.pathname)
      
    }else{
      console.log("b")
      router.push(`/search`)
    }
  }

  // const firsthandle = ()=>{
  //   console.log("aaaa")
  // }

  // useEffect(()=>{
  // firsthandle()
  //   },
  //   // [handleClick])
  //   // [todoLists.length])
  //   [todogenres.janls_id_in])

  // const kakunin = () =>{
  //   console.log(ontime)
  // }

  // useEffect(()=>{
  //   kakunin()
  //     },
  //     // [handleClick])
  //     // [todoLists.length])
  //     [ontime])


  const chengecontenslist = ()=>{
    // console.log(Props.isshow)
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
    {/* {todoLists.janls_id_in.length} */}
{/*   
    {  console.log(todoLists)}
    {  console.log(todoLists)} */}
  
    {/* {console.log(ontime)} */}
    {chengecontenslist()}
      {/* <li
      // data-id = {Props.id}
      onClick={handleClick}
      >
        {Props.name}
      </li> */}
    </>
  )
}