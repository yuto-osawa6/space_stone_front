import { useEffect, useRef, useState } from "react";
import { BsFillSuitHeartFill, BsListUl } from "react-icons/bs"
import { MdDriveFileMoveOutline, MdHome, MdOutlineArticle, MdRateReview, MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
// import { UserCertification } from "../lefts/UserCertification";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { HiOutlineSearchCircle } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import Link from 'next/link'
import { AiOutlineComment, AiOutlineHome } from "react-icons/ai"
import { RiArticleLine } from "react-icons/ri"
import { UserCertification } from "../user/UserCertification";
import {  NextCertification } from "@/components/applications/user/nextauth/NextCertification"
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { GoogleButton } from '@/components/applications/user/GoogleButton'
// import { UserCertification } from "../user/UserCertification";

type Props = {
  locationNumber: number | undefined
}
export const Header:React.FC<Props> = function HeaderFunc(Props){
  // const navigate = useNavigate()
  // const location = useLocation()
  // useScrollPosition
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [currentPostion,setCurrentPositon] = useState<number>(0)
  useScrollPosition(({ prevPos, currPos }) => {
    // console.log(prevPos, currPos )
    setCurrentPositon(currPos.y)
    if (currPos.y>-1){
      setShowMenu(true)
      return
    }
    const visible = currPos.y > prevPos.y;
    setShowMenu(visible);
  }, []);

  // submenu
  const submenuref = useRef<HTMLLIElement>(null)
  const [openMenu,setOpenMenu] = useState<boolean>(false)
  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (openMenu && submenuref.current && !submenuref.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openMenu]); 

  const setOpenMenuHandler = (e:React.MouseEvent<HTMLLIElement> | undefined) => {
    e?.stopPropagation()
    console.log("aaaa")
    openMenu==true?setOpenMenu(false):setOpenMenu(true)
  }

  // const handleStyle = ()=>{
  //   console.log(location.pathname.match(/products/)!=null&&location.pathname.match(/reviews/)!=null)
  //   if(location.pathname.match(/products/)!=null&&location.pathname.match(/reviews/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)==null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)!=null&&location.pathname.match(/threads/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)!=null){
  //     return {}
  //   }
    
  //   if(location.pathname.match(/products/)!=null){
  //     return {display:"none"}
  //   }
   

  //   // all
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)==null){
  //     // {}:{display:"none"}
  //     return {}
  //   }
   

    
  //   return {}
  // }

  // const  handleStyle2 = () => {
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)==null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)!=null&&location.pathname.match(/reviews/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)==null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)!=null&&location.pathname.match(/threads/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)!=null){
  //     return {}
  //   }
  //   if(location.pathname.match(/products/)!=null){
  //     if(currentPostion>-1){
  //       return {width:"100%",backgroundColor: "transparent"}
  //     }else{
  //       return {width:"100%",backgroundColor:"#1a252f"}
  //     }
  //   }
  //   return {}
  // }
  const handleStyle = () => {
     if(Props.locationNumber===undefined){
      return {}
     }else if(Props.locationNumber===1){
      return {display:"none"}
     }
  }
  const handleStyle2 = () => {
    if(Props.locationNumber===undefined){
     return {}
    }else if(Props.locationNumber===1){
      if(currentPostion>-1){
        return {width:"100%",backgroundColor: "transparent"}
      }else{
        return {width:"100%",backgroundColor:"#1a252f"}
      }
    }
 }
//  const { data: session } = useSession()
// //  const token = await getToken({ req, secret })
//  console.log(session)
//  console.log(session)

  return(
    <>
      <div className = "HeaderV1">
        <div className = "HeaderMain"
          style={handleStyle()}
        >
          <div className = "HeaderMainLeft">
            <div className = "HeaderMainLeftTitle">
              <div className = "LOGO">
                <div className = "LogoG">
                  G
                </div>
                <div className = "LogoF">
                  F
                </div>
                <div className = "LogoHeart">
                  <BsFillSuitHeartFill/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className = {`HeaderNavi`}  
        >
          <ul className={showMenu?"":"activeScroll"} 
          style={
            handleStyle2()
          }
          >
            <li><Link href="/"><a><AiOutlineHome/> Top</a></Link></li>
            <li><Link href="/search"><a><HiOutlineSearchCircle/> Search</a></Link></li>
            <li
            ><Link href="/articles"><a><RiArticleLine/> Articles</a></Link></li>
            <li><Link href="/reviews"><a><AiOutlineComment/> Reviews</a></Link></li>
            <li><Link href="/threads"><a><AiOutlineComment/> Threads</a></Link></li>
            <li className="headerUserSighIn"><UserCertification/></li>
            {/* <li><NextCertification/></li> */}
            <li><GoogleButton/></li>
            <li 
              className = "subMenu"
              ref={submenuref}
              onClick={setOpenMenuHandler}
            > 
              <IoMdMenu    
              />
              {openMenu==true&&(
              <div className = "subMenuList"
              >
                <div><Link href ="/#a"><a>今シーズンの作品</a></Link></div>
                <div><Link href ="/#b"><a>昨シーズンの作品</a></Link></div>
                <div><Link href ="/#c"><a>来シーズンの作品</a></Link></div>
                <div><Link href ="/#d"><a>映画情報</a></Link></div>
                <div><Link href ="/#e"><a>おしらせ</a></Link></div>
                <div><Link href ="/#f"><a>放送情報カレンダー</a></Link></div>
                <div><Link href ="/#g"><a>Top10</a></Link></div>
                <div className = "Top100SubMenu"><Link href ="top100"><a>Top100</a></Link></div>
                <div className = "Top100SubMenu"><Link href ="tier"><a>tier</a></Link></div>
                <div className = "Top100SubMenu"><Link href ="weekly"><a>weekly</a></Link></div>
              </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}