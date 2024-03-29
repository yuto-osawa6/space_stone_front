import { useState,useEffect, ReactChild } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store";
import { pussingtodoStylesDataAction } from "@/store/todostyles/actions";
import { StylesList } from "./StylesList";

interface Props {
  children:ReactChild
}
type styleslists={
  id:number
  name:string
}

export const StylesLists:React.FC = function StylesListsFunc(){
  const stylesListsStore = useSelector((state: RootState) => state.styles);
  const stylesselected = useSelector((state: RootState) => state.todostyles);
  const dispatch = useDispatch();
  const selected = (id:number):boolean => {
    const select = stylesselected.styles_id_eq===String(id)?true:false
    return select
  }
  const handleClick = () => {
    dispatch(pussingtodoStylesDataAction(String("")));
  }
  const changeingcontens = () => {
    if(stylesselected.styles_id_eq===""){
    return(
      <>
        <li
        >
        <AiOutlineCheckCircle/>
        Any
        </li>
      </>
    )
    }else{
    return(
      <li
      onClick={handleClick}
      >
      Any
      </li>
    )
    }
  }
  return(
    <>
    <div className = "styleLists">
      {changeingcontens()}
        {stylesListsStore.styles.map((item:styleslists)=>{
          return(
            <StylesList
            key = {item.id}
            id  = {item.id}
            name = {item.name}
            select = {selected(item.id)}
            />
          )
        })}
      </div>
    </>
  )
  }