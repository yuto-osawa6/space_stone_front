
// import { useEffect, useRef, useState } from "react";
// import { BsFillSuitHeartFill } from "react-icons/bs"
// import { MdHome, MdOutlineArticle, MdRateReview, MdSearch } from "react-icons/md";
// import { useDispatch } from "react-redux";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// import { UserCertification } from "../lefts/UserCertification";
// import { useScrollPosition } from '@n8tb1t/use-scroll-position';
// import { HiOutlineSearchCircle } from "react-icons/hi";
// import { IoMdMenu } from "react-icons/io";

// export const Header:React.FC = () => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const NavigateArticleHandler = () => {
//     if (location.pathname==="/articles"){

//     }else{
//       navigate("/articles")
//     }
//   }  

//   // useScrollPosition
//   const [showMenu, setShowMenu] = useState<boolean>(true);
//   const [currentPostion,setCurrentPositon] = useState<number>(0)

//   useScrollPosition(({ prevPos, currPos }) => {
//     setCurrentPositon(currPos.y)
//     // set
//     if (currPos.y>-1){
//       setShowMenu(true)
//       return
//     }
//     const visible = currPos.y > prevPos.y;
//     setShowMenu(visible);
//   }, []);

//   // submenu
//   const submenuref = useRef<HTMLLIElement>(null)
//   const [openMenu,setOpenMenu] = useState<boolean>(false)
//   useEffect(() => {
//     const checkIfClickedOutside = (e:any) => {
//       if (openMenu && submenuref.current && !submenuref.current.contains(e.target)) {
//         setOpenMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", checkIfClickedOutside);
//     return () => {
//       // Cleanup the event listener
//       document.removeEventListener("mousedown", checkIfClickedOutside);
//     };
//   }, [openMenu]); 

//   const setOpenMenuHandler = (e:React.MouseEvent<HTMLLIElement> | undefined) => {
//     e?.stopPropagation()
//     openMenu==true?setOpenMenu(false):setOpenMenu(true)
//   }

//   const handleStyle = ()=>{
//     console.log(location.pathname.match(/products/)!=null&&location.pathname.match(/reviews/)!=null)
//     if(location.pathname.match(/products/)!=null&&location.pathname.match(/reviews/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)==null){
//       return {}
//     }
//     if(location.pathname.match(/products/)!=null&&location.pathname.match(/threads/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)!=null){
//       return {}
//     }
    
//     if(location.pathname.match(/products/)!=null){
//       return {display:"none"}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)==null){
//       return {}
//     }
   

    
//     return {}
//   }

//   const  handleStyle2 = () => {
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)==null){
//       return {}
//     }
//     if(location.pathname.match(/products/)!=null&&location.pathname.match(/reviews/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)==null){
//       return {}
//     }
//     if(location.pathname.match(/products/)!=null&&location.pathname.match(/threads/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)==null&&location.pathname.match(/threads/)!=null){
//       return {}
//     }
//     if(location.pathname.match(/products/)!=null){
//       if(currentPostion>-1){
//         return {width:"100%",backgroundColor: "transparent"}
//       }else{
//         return {width:"100%",backgroundColor:"#1a252f"}
//       }
//     }
//     return {}
//   }

//   return(
//     <>
//       <div className = "HeaderV1">
//         {/* <div className = "HeaderMain"style={location.pathname.match(/products/)==null||location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)!=null?{}:{display:"none"}}> */}
//         <div className = "HeaderMain"style={handleStyle()}>

//           <div className = "HeaderMainLeft">
//             <div className = "HeaderMainLeftTitle">
//               <div className = "LOGO">
//                 <div className = "LogoG">
//                   G
//                 </div>
//                 <div className = "LogoF">
//                   F
//                 </div>
//                 <div className = "LogoHeart">
//                   <BsFillSuitHeartFill/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className = {`HeaderNavi`}
        
//         >
//           <ul className={showMenu?"":"activeScroll"} style={
//             handleStyle2()
//           //   location.pathname.match(/products/)==null||location.pathname.match(/products/)==null&&location.pathname.match(/reviews/)!=null?{}:
//           // currentPostion>-1?
//           // {width:"100%",backgroundColor: "transparent"}
//           // :
//           // {width:"100%",backgroundColor:"#1a252f"}
//         }

          
//           >
//             <li><Link to="/"><MdHome/> Top</Link></li>
//             <li><Link to="/search"><HiOutlineSearchCircle/> Search</Link></li>
//             <li
//             // onClick={NavigateArticleHandler}
//             ><Link to="/articles"><MdOutlineArticle/> Articles</Link></li>
//             <li><Link to="/reviews"><MdRateReview/> Reviews</Link></li>

//             <li><Link to="/threads"><MdRateReview/> Threads</Link></li>

//             {/* <li><Link to="/">SignIn</Link></li> */}
//             <li className="headerUserSighIn"><UserCertification/></li>
//             <li 
//               className = "subMenu"
//               ref={submenuref}
//               onClick={setOpenMenuHandler}
//             > 
              
//               <IoMdMenu
              
//               />

//               {openMenu==true&&(
//               <div className = "subMenuList"
             
//               >
//                 <li><Link to ="/#a">今シーズンの作品</Link></li>
//                 <li><Link to ="/#b">昨シーズンの作品</Link></li>
//                 <li><Link to ="/#c">来シーズンの作品</Link></li>
//                 <li><Link to ="/#d">映画情報</Link></li>
//                 <li><Link to ="/#e">おしらせ</Link></li>
//                 <li><Link to ="/#f">放送情報カレンダー</Link></li>
//                 <li><Link to ="/#g">Top10</Link></li>
//                 {/* <li><Link to ="/#h"></Link></li> */}
//                 <li className = "Top100SubMenu"><Link to ="top100">Top100</Link></li>
//                 <li className = "Top100SubMenu"><Link to ="tier">tier</Link></li>
//                 <li className = "Top100SubMenu"><Link to ="weekly">weekly</Link></li>


//                 {/* <li></li> */}
//               </div>
//               )}
              
              
//             </li>
           
//           </ul>
//         </div>
       
//       </div>
//     </>
//   )
// }

export const Hearder:React.FC = () => {
  return(
    <>
    </>
  )
}