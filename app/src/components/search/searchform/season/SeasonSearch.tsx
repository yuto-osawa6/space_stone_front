import { useState,useEffect, ReactChild, useRef } from "react"
// import { StylesLists } from "./StylesLists"
import { HiChevronDoubleDown } from "react-icons/hi"
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { deletingtodoStylesDataAllAction } from "store/todostyles/actions";
import {IoIosCloseCircle} from "react-icons/io"
// import { HoverClose } from "./HoverClose";
// import { useLocation, useNavigate } from "react-router";
import { HoverClose } from "../HoverClose";
import { deletingtodoKisetsuDataAllAction } from "store/kisetsu/actions";
import { SeasonLists } from "./SeasonLists";
import { useRouter } from "next/router";
// }
interface Props {
  children:ReactChild
}

export const SeasonSearch:React.FC = () =>{

  const ref = useRef<HTMLDivElement>(null!);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ishover, setIshover] = useState(false);

  const KisetsuStore = useSelector((state: RootState) => state.kisetsu);
  // const styles = useSelector((state: RootState) => state.styles);

  const router = useRouter()


  const dispatch = useDispatch();


  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      // console.log(e.target)
      // console.log(ref.current)
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const deletingtag3 = () => {
    dispatch(deletingtodoKisetsuDataAllAction())

    if (router.pathname==="/search"){
      // console.log(location.pathname)
      
    }else{
      router.push(`/search`)
    }
  }





  const styles_eq_check = () =>{
    if (KisetsuStore.kisetsusids.year_season_seasons_id_eq==="")
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
          {KisetsuStore.kisetsu.id!=0?KisetsuStore.kisetsu.name:"Any"}
          
        </div>
      </>
    )
  }

  return(
    <>
      <div className ="styles">
        <label>
          Season
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
            <SeasonLists/>
          )}
          </div>
        </div>
      </div>
    </>
  )
  }