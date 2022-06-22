

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { FaSort } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { actionEmotionData } from "@/store/emotion/actions";
import { sortAction } from "@/store/sort/actions";

interface sort {
  s:{
    sort:string
  }
}

interface Props {
  setSort: React.Dispatch<React.SetStateAction<string>>
  setIsMenuOpen2: React.Dispatch<React.SetStateAction<boolean>>
  emotion: emotion
}
type emotion = {
  id:number
  emotion:string
}

export const EmotionSortItem:React.FC<Props> = function EmotionSortItemFunc(Props){
  const router = useRouter()
  const dispatch = useDispatch();
  const handleclick = () => { 
    dispatch(sortAction(""));
    dispatch(actionEmotionData(String(Props.emotion.id)))
    Props.setSort(Props.emotion.emotion)
    Props.setIsMenuOpen2(false)
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
        {Props.emotion.emotion}
      </li>
    </>
  )
}