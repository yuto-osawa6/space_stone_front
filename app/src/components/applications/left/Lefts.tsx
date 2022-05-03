import React, { useEffect, useState } from "react"
import { style,genre } from "@/interfaces/product"
import { useDispatch } from 'react-redux';
import { BsFillSuitClubFill, BsFillSuitDiamondFill, BsFillSuitHeartFill, BsFillSuitSpadeFill } from "react-icons/bs"
import { IoChevronDownOutline } from "react-icons/io5";
import { useExecLeft } from "@/lib/api/left";
import LeftStyle from "./leftMenus/LeftStyles";
import LeftGenre from "./leftMenus/LeftGenres";
import { LeftsArticles } from "./leftMenus/LeftArticles";
import { LeftsThreads } from "./leftMenus/LeftsThreads";
import { LeftsReviews } from "./leftMenus/LeftReviews";
import { actionSettingGenresData } from "@/store/genres/action";
import { actionSettingStylesData } from "@/store/styles/actions";

type Props = {
  locationNumber: number | undefined
  // doneyet-1-next 再レンダー問題、reduxでlocationの管理をするかどうか
}

const Lefts:React.FC<Props> = function LeftsFunc(Props){
const dispatch = useDispatch();
const {data,error} = useExecLeft()

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
const handleStyle = () => {
  if(Props.locationNumber===undefined){
    return {}
  }else if(Props.locationNumber===1){
    return {display:"none"}
  }
}

// doneyet-1 必要ない下
useEffect(()=>{
  if(!data)return
  dispatch(actionSettingGenresData(data.genres));
  dispatch(actionSettingStylesData(data.styles));
},[data])


console.log(data,error)
console.log(!error)
// console.log(data?data.genres[0].name:"")
// console.log()
  return(
    <>
    {/* {error&&(
      <div className="">
        error
      </div>
    )} */}
    {/* {data.genres[0].id} */}
      <div className = "main-left" 
      style={handleStyle()}
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

        </div>
      </div>
    </>
  )
}
export default Lefts

