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
import { url } from "@/utils/config";
import { useScroll } from "@/hook/useScroll";
import { useRouter } from "next/router";

type Props = {
  locationNumber: number | undefined
}
export const Header:React.FC<Props> = function HeaderFunc(Props){
  const a = useScroll()
  // console.log(a)
  // useScrollPosition
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [currentPostion,setCurrentPositon] = useState<number>(0)
  // useScroll(({scrollY,preveScroll}) => {
  //   // if (scrollY>-1){
  //   //   setShowMenu(true)
  //   //   return
  //   // }
  //   // const visible = scrollY > preveScroll;
  //   // setShowMenu(visible);
  // },[])

  useEffect(()=>{
    // console.log("aaa")
    // console.log(a.scrollY ,a.prevScrollY )
    // console.log(showMenu)
    // console.log(a.scrollY<1)
    // console.log("aaa")
    // console.log(a.scrollY > a.prevScrollY)
    if (a.scrollY<56){
      console.log("aaa34")
      setShowMenu(true)
      return
    }
    const visible = a.scrollY < a.prevScrollY
    setShowMenu(visible);
  },[a.scrollY])

  // useScrollPosition(({ prevPos, currPos }) => {
  //   setCurrentPositon(currPos.y)
  //   if (currPos.y>-1){
  //     setShowMenu(true)
  //     return
  //   }
  //   const visible = currPos.y > prevPos.y;
  //   setShowMenu(visible);
  // }, []);

  // submenu
  const submenuref = useRef<HTMLLIElement>(null)
  const [openMenu,setOpenMenu] = useState<boolean>(false)
  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (openMenu && submenuref.current && !submenuref.current.contains(e.target)) {
        setOpenMenu(false);
        // document.body.style.overflowY = ""
        // document.body.style.touchAction = ""
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
    // if (windowSize.width < 768){
    //   openMenu==false?document.body.style.overflowY = "hidden":document.body.style.overflowY = ""
    //   openMenu==false?document.body.style.touchAction = "none":document.body.style.touchAction = ""
    // }else{
    // }
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
const router = useRouter()
const handleClick = (url:string) => {
  router.push(url)
  dispatch(SubMenuAction(true))
}
// locate
const { t } = useLocale()
// const windowSize = useWindowDimensions()
// console.log(windowSize)
    // useEffect(()=>{
    //   const touchHandler = (event: any) => {
    //     // if(windowSize.width >= 768){
    //     //   return
    //     // }else{
    //       event.preventDefault();
    //     // }
    //   };
    //   document.addEventListener('touchmove', touchHandler, {
    //     passive: false
    //   });
    //   return () => {
    //     document.removeEventListener("touchmove", touchHandler);
    //   };
    // },[windowSize.width])
  return(
    <>
      <div className = "HeaderV1">
        <div className = "HeaderMain"
          style={handleStyle()}
        >
          <div className = "HeaderMainLeft">
            <div className = "HeaderMainLeftTitle">
              <div className = "LOGO">
                <div className=""
                style={{
                  marginRight:"10px"
                }}
                >
                <img src={url('/topimage.png')} alt="Sample image"></img>
                </div>
                <div className = "LogoG">
                  {t.Logo.G}
                </div>
                <div className = "LogoF">
                  {t.Logo.F}
                </div>
                {/* <div className = "LogoHeart">
                  <BsFillSuitHeartFill/>
                </div> */}
              </div>
              {/* <div className=""
              style={{
                color: "#edf1f5",
                fontSize: "0.9rem"
              }}
              >
                {t.Logo.SUBTITLE}
              </div> */}
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
            <li className = "nomalNavi"><Link href="/"><a><div><div><AiOutlineHome/> {t.Headers.TOP}</div><div className = {"home"}>{t.SubHeader.TOP}</div></div></a></Link></li>
            <li className = "nomalNavi"><Link href="/search"><a><div><div><HiOutlineSearchCircle/> {t.Headers.SEARCH}</div><div className = {"home"}>{t.SubHeader.SEARCH}</div></div></a></Link></li>
            <li className = "nomalNavi"><Link href="/articles"><a><div><div><RiArticleLine/> {t.Headers.ARTICLE}</div><div className = {"home"}>{t.SubHeader.ARTICLE}</div></div></a></Link></li>
            <li className = "nomalNavi"><Link href="/reviews"><a><div><div><AiOutlineComment/> {t.Headers.REVIEWS}</div><div className = {"home"}>{t.SubHeader.REVIEWS}</div></div></a></Link></li>
            <li className = "nomalNavi"><Link href="/threads"><a><div><div><AiOutlineComment/> {t.Headers.THREAD}</div><div className = {"home"}>{t.SubHeader.THREAD}</div></div></a></Link></li>
            <li className="headerUserSighIn nomalNavi"
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
                  <div onClick={()=>handleClick("/#weekly-ranking")}><a>{t.SubMenu.QUESTIONNAIRE}</a></div>
                  <div onClick={()=>handleClick("/#this-season")}><a>{t.SubMenu.THISSEASON}</a></div>
                  <div onClick={()=>handleClick("/#last-season")}><a>{t.SubMenu.LASTSEASON}</a></div>
                  <div onClick={()=>handleClick("/#next-season")}><a>{t.SubMenu.NEXTSEASON}</a></div>
                  <div onClick={()=>handleClick("/#movies")}><a>{t.SubMenu.MOVIE}</a></div>
                  <div onClick={()=>handleClick("/#news")}><a>{t.SubMenu.NEWS}</a></div>
                  <div onClick={()=>handleClick("/#toptens")}><a>{t.SubMenu.TOP10}</a></div>
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
                    <div onClick={()=>handleClick("/#weekly-ranking")}><a>{t.SubMenu.QUESTIONNAIRE}</a></div>
                    <div onClick={()=>handleClick("/#this-season")}><a>{t.SubMenu.THISSEASON}</a></div>
                    <div onClick={()=>handleClick("/#last-season")}><a>{t.SubMenu.LASTSEASON}</a></div>
                    <div onClick={()=>handleClick("/#next-season")}><a>{t.SubMenu.NEXTSEASON}</a></div>
                    <div onClick={()=>handleClick("/#movies")}><a>{t.SubMenu.MOVIE}</a></div>
                    <div onClick={()=>handleClick("/#news")}><a>{t.SubMenu.NEWS}</a></div>
                    <div onClick={()=>handleClick("/#toptens")}><a>{t.SubMenu.TOP10}</a></div>
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