import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { FaSort } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { actionDeleteEmotionData } from "@/store/emotion/actions";
import { sortAction } from "@/store/sort/actions";

interface sort {
  s:{
    sort:string
  }
}

interface Props {
  title : string
  sort : string
  setSort: React.Dispatch<React.SetStateAction<string>>
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SortList:React.FC<Props> = function SortListFunc(Props){
    // 
    const router = useRouter()


  const dispatch = useDispatch();

  const handleclick = () => { 
    dispatch(sortAction(Props.sort));
    dispatch(actionDeleteEmotionData())
    Props.setSort(Props.title)
    Props.setIsMenuOpen(false)
    if (router.pathname==="/search"){
    }else{
      router.push(`/search`)
    }
  }
  
  return(
    <>
      <li
      onClick={()=>handleclick()}
      >
        {Props.title}
      </li>
    </>
  )
}