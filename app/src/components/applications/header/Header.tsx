import { useEffect, useRef, useState } from "react";
import { BsFillSuitHeartFill, BsListUl } from "react-icons/bs"
import { MdDriveFileMoveOutline, MdHome, MdOutlineArticle, MdRateReview, MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { HiOutlineSearchCircle } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import Link from 'next/link'
import { AiOutlineComment, AiOutlineHome } from "react-icons/ai"
import { RiArticleLine } from "react-icons/ri"
import { UserCertification } from "../user/UserCertification";
import { SubMenuAction } from "@/store/submenu/actions";
import { useLocale } from "@/lib/ini/local/local";
import { useWindowDimensions } from "@/hook/useWindowResize";

type Props = {
  locationNumber: number | undefined
}
export const Header:React.FC<Props> = function HeaderFunc(Props){
  // useScrollPosition
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [currentPostion,setCurrentPositon] = useState<number>(0)
  useScrollPosition(({ prevPos, currPos }) => {
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
        document.body.style.overflowY = ""
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openMenu]); 

  const windowSize = useWindowDimensions()
  const [width,setWidth] = useState<boolean>()
  function handle(event:any) {
    event.preventDefault();
}
  const setOpenMenuHandler = (e:React.MouseEvent<HTMLLIElement> | undefined) => {
    e?.stopPropagation()
    // console.log("aaaae2")
    openMenu==true?setOpenMenu(false):setOpenMenu(true)
    if (windowSize.width < 768){
      openMenu==false?document.body.style.overflowY = "hidden":document.body.style.overflowY = ""
    }else{
    }
  }

  const handleStyle = () => {
    if(Props.locationNumber===undefined){
    return {}
    }else if(Props.locationNumber===1){
    return {display:"none"}
    // return {backgroundColor:"#1a252f"}
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
const handleClick = () => {
  dispatch(SubMenuAction(true))
}
// locate
const { t } = useLocale()
// const windowSize = useWindowDimensions()
// console.log(windowSize)
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
                  {t.Logo.G}
                </div>
                <div className = "LogoF">
                  {t.Logo.F}
                </div>
                <div className = "LogoHeart">
                  <BsFillSuitHeartFill/>
                </div>
              </div>
              <div className=""
              style={{
                color: "#edf1f5",
                fontSize: "0.9rem"
              }}
              >
                {t.Logo.SUBTITLE}
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
            <li><Link href="/"><a><div><div><AiOutlineHome/> {t.Headers.TOP}</div><div className = {"home"}>{t.SubHeader.TOP}</div></div></a></Link></li>
            <li><Link href="/search"><a><div><div><HiOutlineSearchCircle/> {t.Headers.SEARCH}</div><div className = {"home"}>{t.SubHeader.SEARCH}</div></div></a></Link></li>
            <li><Link href="/articles"><a><div><div><RiArticleLine/> {t.Headers.ARTICLE}</div><div className = {"home"}>{t.SubHeader.ARTICLE}</div></div></a></Link></li>
            <li><Link href="/reviews"><a><div><div><AiOutlineComment/> {t.Headers.REVIEWS}</div><div className = {"home"}>{t.SubHeader.REVIEWS}</div></div></a></Link></li>
            <li><Link href="/threads"><a><div><div><AiOutlineComment/> {t.Headers.THREAD}</div><div className = {"home"}>{t.SubHeader.THREAD}</div></div></a></Link></li>
            <li className="headerUserSighIn"
            style={{
              display:"block"
            }}
            ><UserCertification/></li>
            <li 
              className = "subMenu"
              ref={submenuref}
              onClick={setOpenMenuHandler}
            > 
              <IoMdMenu    
              />
              {windowSize.width >= 768&&openMenu==true&&(
              <div className = "subMenuList"
              >
                <div className="">
                  <div onClick={handleClick}><Link href ="/#weekly-ranking" scroll={false}><a>{t.SubMenu.QUESTIONNAIRE}</a></Link></div>
                  <div onClick={handleClick}><Link href ="/#this-season" scroll={false} ><a>{t.SubMenu.THISSEASON}</a></Link></div>
                  <div onClick={handleClick}><Link href ="/#last-season" scroll={true}><a>{t.SubMenu.LASTSEASON}</a></Link></div>
                  <div onClick={handleClick}><Link href ="/#next-season" scroll={true}><a>{t.SubMenu.NEXTSEASON}</a></Link></div>
                  <div onClick={handleClick}><Link href ="/#movies" scroll={true}><a>{t.SubMenu.MOVIE}</a></Link></div>
                  <div onClick={handleClick}><Link href ="/#news"><a>{t.SubMenu.NEWS}</a></Link></div>
                  <div onClick={handleClick}><Link href ="/#toptens"><a>{t.SubMenu.TOP10}</a></Link></div>
                  <div className = "Top100SubMenu"><Link href ="/top100"><a>{t.SubMenu.TOP100}</a></Link></div>
                  <div className = "Top100SubMenu"><Link href ="/tier"><a>{t.SubMenu.TIER}</a></Link></div>
                  <div className = "Top100SubMenu"><Link href ="/weekly"><a>{t.SubMenu.LASTQUESTIONNAIRE}</a></Link></div>
                </div>
              </div>
              )}

                {windowSize.width < 768&&openMenu==true&&(     
                  <div className = "subMenuList768"
                  >
                    <div className="">
                      <div><Link href="/"><a><div className="headersub768"><div className = "home2"><AiOutlineHome/> {t.Headers.TOP}</div><div className = {"home23"}>{t.SubHeader.TOP}</div></div></a></Link></div>
                      <div><Link href="/search"><a><div className="headersub768"><div className = "home2"><HiOutlineSearchCircle/> {t.Headers.SEARCH}</div><div className = {"home23"}>{t.SubHeader.SEARCH}</div></div></a></Link></div>
                      <div><Link href="/articles"><a><div className="headersub768"><div className = "home2"><RiArticleLine/> {t.Headers.ARTICLE}</div><div className = {"home23"}>{t.SubHeader.ARTICLE}</div></div></a></Link></div>
                      <div><Link href="/reviews"><a><div className="headersub768"><div className = "home2"><AiOutlineComment/> {t.Headers.REVIEWS}</div><div className = {"home23"}>{t.SubHeader.REVIEWS}</div></div></a></Link></div>
                      <div><Link href="/threads"><a><div className="headersub768"><div className = "home2"><AiOutlineComment/> {t.Headers.THREAD}</div><div className = {"home23"}>{t.SubHeader.THREAD}</div></div></a></Link></div>
                    </div>
                    <div className="">
                      <div onClick={handleClick}><Link href ="/#weekly-ranking" scroll={false}><a>{t.SubMenu.QUESTIONNAIRE}</a></Link></div>
                      <div onClick={handleClick}><Link href ="/#this-season" scroll={false} ><a>{t.SubMenu.THISSEASON}</a></Link></div>
                      <div onClick={handleClick}><Link href ="/#last-season" scroll={true}><a>{t.SubMenu.LASTSEASON}</a></Link></div>
                      <div onClick={handleClick}><Link href ="/#next-season" scroll={true}><a>{t.SubMenu.NEXTSEASON}</a></Link></div>
                      <div onClick={handleClick}><Link href ="/#movies" scroll={true}><a>{t.SubMenu.MOVIE}</a></Link></div>
                      <div onClick={handleClick}><Link href ="/#news"><a>{t.SubMenu.NEWS}</a></Link></div>
                      <div onClick={handleClick}><Link href ="/#toptens"><a>{t.SubMenu.TOP10}</a></Link></div>
                      <div className = "Top100SubMenu"><Link href ="/top100"><a>{t.SubMenu.TOP100}</a></Link></div>
                      <div className = "Top100SubMenu"><Link href ="/tier"><a>{t.SubMenu.TIER}</a></Link></div>
                      <div className = "Top100SubMenu"><Link href ="/weekly"><a>{t.SubMenu.LASTQUESTIONNAIRE}</a></Link></div>
                    </div>
                  </div>
                )}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}