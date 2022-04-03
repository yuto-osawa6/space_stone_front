import { useState,useEffect, ReactChild } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store";
import { pussingtodoStylesDataAction } from "store/todostyles/actions";
import { deletingtodoKisetsuDataAllAction } from "store/kisetsu/actions";
import { SeasonItem } from "./SeasonItem";


export const SeasonLists:React.FC = () =>{
  const KisetsuStore = useSelector((state: RootState) => state.kisetsu);
  const season = [{id:2,name:"春"},{id:3,name:"夏"},{id:4,name:"秋"},{id:5,name:"冬"},{id:6,name:"不定期"}]
  const dispatch = useDispatch();

  const selected = (id:number):boolean => {
    const select = KisetsuStore.kisetsusids.year_season_seasons_id_eq===String(id)?true:false
    return select
  }

  const handleClick = () => {
    dispatch(deletingtodoKisetsuDataAllAction())
  }

  const changeingcontens = () => {
    if(KisetsuStore.kisetsusids.year_season_seasons_id_eq===""){
    return(
      <>
        <li
        >
        <AiOutlineCheckCircle/>
        Any
        </li>
      </>
    )
    }else{
    return(
      <li
      onClick={handleClick}
      >
      Any
      </li>
    )
    }
  }
  return(
    <>
    <div className = "styleLists">
      {changeingcontens()}
      {/* {updatinglist()} */}
        {season.map((item)=>{
        // {console.log(item)}
          return(
            <SeasonItem
            key = {item.id}
            // id  = {item.id}
            // name = {item.name}
            kisetsu = {item}
            select = {selected(item.id)}>

            </SeasonItem>
          )
        })}
      </div>
    </>
  )
  }