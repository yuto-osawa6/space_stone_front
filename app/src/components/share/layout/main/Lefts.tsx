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
// import { LeftsArticles } from "./articles/LeftArticles"
// import { LeftsReviews } from "./Reviews/LeftReviews"
// import { LeftsThreads } from "./Threads/LeftsThreads"

const Lefts:React.FC = () =>{

  const [styles, setStyles] = useState<style[]>([]);
  const [genres,setGenres] = useState<genre[]>([]);
  const [articles,SetArticles]  =useState<any[]>([]);
  const genreListsStore = useSelector((state: RootState) => state.styles);
  const genreListsStore2 = useSelector((state: RootState) => state.genres);


  const dispatch = useDispatch();

//   const handleExecTest = async () => {
//   const res = await execLeft()
//   if (res.status === 200) {
//     setStyles(res.data.styles)
//     setGenres(res.data.genres)
//     dispatch(actionSettingGenresData(res.data.genres));
//     dispatch(actionSettingStylesData(res.data.styles));
//     console.log(res.data)
//   }
// }
// useEffect(() => {
//   handleExecTest()
// }, [])

// const location = useLocation();

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
              // className={openFormats == true?"addTitleOnTime":""}
            />Formats <IoChevronDownOutline
            className={`leftDownArrow ${openFormats == true?"addTitleOnTime":""}`}
            /></h3>


          </div>
          <div className = {`category__lists01 category__lists ${openFormats == true?"addFormatsList":"removeFormatsList"}`}>
          {/* {styles.map((item: style) => (
                <LeftStyle name={item.name} id={item.id} count={item.count} key={item.id}/>
            )) } */}
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
            {/* {genres.map((item: genre) => (
        
       
                <LeftGenre name={item.name} id={item.id} count={item.count} key={item.id}/>


            )) } */}
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
              {/* <LeftsArticles/> */}
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
              {/* <LeftsReviews/> */}
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
              {/* <LeftsThreads/> */}
            </div>
          </div>


          <div></div>
        </div>
      </div>
    </>
  )
}
export default Lefts

