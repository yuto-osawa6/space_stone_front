import { useState,useEffect, ReactChild, useRef } from "react"
import { StylesLists } from "./StylesLists"
import { HiChevronDoubleDown } from "react-icons/hi"
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoStylesDataAllAction } from "@/store/todostyles/actions";
import {IoIosCloseCircle} from "react-icons/io"
import { HoverClose } from "./HoverClose";
import { useRouter } from "next/router";
interface Props {
  children:ReactChild
}

export const Styles:React.FC = function StylesFunc(){

  const ref = useRef<HTMLDivElement>(null!);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ishover, setIshover] = useState(false);
  const styleListsStore = useSelector((state: RootState) => state.todostyles);
  const styles = useSelector((state: RootState) => state.styles);
  const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const deletingtag3 = () => {
    dispatch(deletingtodoStylesDataAllAction())
    if (router.pathname==="/search"){
    }else{
      router.push(`/search`)
    }
  }

  const styles_eq_check = () =>{
    if (Number(styleListsStore.styles_id_eq)===0)
    return(
      <>
        <div className = "selected_style_box_dummy_box__title">
          Any
        </div>
      </>
    )
    return(
      <>
        <div className = "selected_style_box_dummy_box__title"
        onClick={()=>deletingtag3()}
        onMouseEnter={()=>setIshover(true)}
        onMouseLeave={()=>setIshover(false)}
        >
          {ishover &&(
            <HoverClose
            ishover = {ishover}
            />
          )}
          {Number(styleListsStore.styles_id_eq)-1>=0? styles.styles.filter((data:any) => data.id === Number(styleListsStore.styles_id_eq))[0].name:"Any"}
        </div>
      </>
    )
  }

  return(
    <>
      <div className ="styles">
        <label>
          Formats
        </label>
        <div className = "selected_style_box"
        ref = {ref}
        >
          <div className = "selected_style_box_dummy_box"
          onClick={() => setIsMenuOpen(true)}
          >
              {styles_eq_check()}
          </div>
          <div className = "selected_style_icons">
          <HiChevronDoubleDown/>
          </div>
          <div className = "styleesSearch__contents__dummy">
          {isMenuOpen && (
          <StylesLists>
          </StylesLists>
          )}
          </div>
        </div>
      </div>
    </>
  )
  }