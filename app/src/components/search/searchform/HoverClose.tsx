import { useState,useEffect, ReactChild, useRef } from "react"
import { StylesLists } from "./StylesLists"
import { HiChevronDoubleDown } from "react-icons/hi"
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoStylesDataAllAction } from "@/store/todostyles/actions";
import {IoIosCloseCircle} from "react-icons/io"
import { AiOutlineCloseCircle } from "react-icons/ai";
// AiOutlineCloseCircle
// }
interface Props {
  // children:ReactChild
  ishover:boolean
}

export const HoverClose:React.FC<Props> = function HoverCloseFunc(Props){

 
  return(
    <>
      <IoIosCloseCircle className="HoverClose">
        </IoIosCloseCircle>
 
      {/* <AiOutlineCloseCircle className="HoverClose"/> */}
      
    </>
  )
  }