import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { FaSort } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "store";
import { actionDeleteEmotionData } from "store/emotion/actions";
import { sortAction } from "store/sort/actions";

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

export const SortList:React.FC<Props> = (Props) => {
  // const [sort,setSort] = useState<sort>()
  // const sortstore = useSelector((state: RootState) => state.sort);

  // const ref = useRef<HTMLDivElement>(null!);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // useEffect(() => {
  //   const checkIfClickedOutside = (e:any) => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
  //       setIsMenuOpen(false);
  //     }
  //     console.log(e.target)
  //     console.log(ref.current)
  //   };

  //   document.addEventListener("mousedown", checkIfClickedOutside);

  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //     console.log("aa")
  //   };
  // }, [isMenuOpen]);

  
  return(
    <>
      <li
      onClick={()=>handleclick()}
      >
        {Props.title}
        {/* {sortstore.s.sort} */}
      </li>
    </>
  )
}