import React, { useEffect, useState } from "react"
// import { execLeft } from "api/left"
import { style,genre,genreStore } from "interfaces/product"
// import LeftStyle  from "./Left_style"
// import LeftGenre from "./Left_genre"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { actionSettingGenresData } from 'store/genres/action';
import { actionSettingStylesData } from "store/styles/actions"
// import { UsersSign } from "./UsersSign"
// import { UserCertification } from "./UserCertification"
// import { useLocation } from "react-router"
import { BsCaretDown, BsCaretDownFill, BsFillDiamondFill, BsFillHeartFill, BsFillSuitClubFill, BsFillSuitDiamondFill, BsFillSuitHeartFill, BsFillSuitSpadeFill, BsSuitClubFill } from "react-icons/bs"
import { AiFillDownCircle, AiOutlineDown } from "react-icons/ai"
import { BiChevronDown } from "react-icons/bi"
import { FaChevronDown } from "react-icons/fa"
import { MdKeyboardArrowDown } from "react-icons/md"
import { IoChevronDownOutline } from "react-icons/io5";
import { execLeft } from "lib/api/left";
import LeftStyle from "./leftMenus/LeftStyles";
import LeftGenre from "./leftMenus/LeftGenres";
import { LeftsArticles } from "./leftMenus/LeftArticles";
import { LeftsThreads } from "./leftMenus/LeftsThreads";
import { LeftsReviews } from "./leftMenus/LeftReviews";
// import { LeftsArticles } from "./articles/LeftArticles"
// import { LeftsReviews } from "./Reviews/LeftReviews"
// import { LeftsThreads } from "./Threads/LeftsThreads"

const Lefts:React.FC = () =>{
const dispatch = useDispatch();
const {data,error} = execLeft()

// chage
const [openFormats,SetOpenFormats] = useState<boolean>(true)
const [openGenres,SetOpenGenres] = useState<boolean>(false)
const [openArticles,SetOpenArticles] = useState<boolean>(true)
const [openReviews,SetOpenReviews] = useState<boolean>(true)
const [openThreads,SetOpenThreads] = useState<boolean>(true)

const changeOpenFormats = () => {
  if (openFormats == false){
    SetOpenFormats(true)
  }else{
    SetOpenFormats(false)
  }
}

const changeOpenFormats2 = () => {
  if (openGenres == false){
    SetOpenGenres(true)
  }else{
    SetOpenGenres(false)
  }
}

const changeOpenFormats3 = () => {
  if (openArticles == false){
    SetOpenArticles(true)
  }else{
    SetOpenArticles(false)
  }
}
const changeOpenFormats4 = () => {
  if (openReviews == false){
    SetOpenReviews(true)
  }else{
    SetOpenReviews(false)
  }
}

const changeOpenFormats5 = () => {
  if (openThreads == false){
    SetOpenThreads(true)
  }else{
    SetOpenThreads(false)
  }
}
// console.log(data)
// console.log(error)

// const handleStyle = () => {
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
//    return {display:"none"}
//   }
//   return {}

// }

// console.log(data)

  return(
    <>
      <div className = "main-left" 
      // style={handleStyle()}
      >
        <div className = "main-contents__box">
          <div className = "category__title">
            <h3
            onClick={changeOpenFormats}
            ><BsFillSuitClubFill
            />Formats <IoChevronDownOutline
            className={`leftDownArrow ${openFormats == true?"addTitleOnTime":""}`}
            /></h3>
          </div>
          <div className = {`category__lists01 category__lists ${openFormats == true?"addFormatsList":"removeFormatsList"}`}>
          {data&&data.styles?
            <>
              {data.styles.map((item: style) => (
                <LeftStyle name={item.name} id={item.id} count={item.count} key={item.id}/>
              )) }
            </>
          :"Loding"}
          </div>
          <div className = "main-contents__box__left">
            <div className = "category__title">
            < h3
            onClick={changeOpenFormats2}
            ><BsFillSuitSpadeFill/><div>Genres</div>
            <IoChevronDownOutline
            className={`leftDownArrow ${openGenres == true?"addTitleOnTime":""}`}
            />
            </h3>
            </div>
            <div className = {`category__lists02 category__lists ${openGenres == true?"addGenresList":"removeGenresList"}`} id ="category_lists02">
            {data&&data.genres?
              <>
                {data.genres.map((item: genre) => (
                  <LeftGenre name={item.name} id={item.id} count={item.count} key={item.id}/>
                ))} 
              </>
            :"Loding"}
            </div>
          </div>

          <div className = "main-contents__box__left">
            <div className = "category__title">
            <h3
            onClick={changeOpenFormats3}
            ><BsFillSuitDiamondFill/><div>Articles</div>
            <IoChevronDownOutline
            className={`leftDownArrow ${openArticles == true?"addTitleOnTime":""}`}
            />
            </h3>
            </div>
            <div className = {`category__lists02 category__lists ${openArticles == true?"addArticlesList":"removeArticlesList"}`} id ="category_lists02">
              <LeftsArticles/>
            </div>
          </div>

          <div className = "main-contents__box__left">
            <div className = "category__title">
            <h3
            onClick={changeOpenFormats4}
            ><BsFillSuitHeartFill/><div>Reviews</div>
            <IoChevronDownOutline
            className={`leftDownArrow ${openReviews == true?"addTitleOnTime":""}`}
            />
            </h3>
            </div>
            <div className = {`category__lists02 category__lists ${openReviews == true?"addArticlesList":"removeArticlesList"}`} id ="category_lists02">
              <LeftsReviews/>
            </div>
          </div>


          <div className = "main-contents__box__left">
            <div className = "category__title">
            <h3
            onClick={changeOpenFormats5}
            ><BsFillSuitHeartFill/><div>Threads</div>
            <IoChevronDownOutline
            className={`leftDownArrow ${openThreads == true?"addTitleOnTime":""}`}
            />
            </h3>
            </div>
            <div className = {`category__lists02 category__lists ${openThreads == true?"addArticlesList":"removeArticlesList"}`} id ="category_lists02">
              <LeftsThreads/>
            </div>
          </div>


          <div></div>
        </div>
      </div>
    </>
  )
}
export default Lefts

