import React, { useState,useEffect, useRef } from "react"
import { GenresLists } from "./GenresLists";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { execGenreSearch } from "@/lib/api/main";
import { HiChevronDoubleDown } from "react-icons/hi"
import { deletingtodoGenresDataOneAction } from "@/store/todogenres/actions";
import { watchFile } from "fs";
import { HoverClose } from "./HoverClose";
import { GenresTag } from "./GenresTag";
import { IoSearchCircle } from 'react-icons/io5'


interface genresdata{
  id:number
  name:string
}

export const GenresSearch:React.FC= function GenresSearchFunc(){

  const [searchinput,Setserachinput] = useState<string>("")
  const [show, setShow] = useState(true);
  const [ishover, setIshover] = useState(false);
  // const [isShown,setIsShown] = useState(false);

  // const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
  const genreLists = useSelector((state: RootState) => state.genres);
  const genreListsStore = useSelector((state: RootState) => state.todogenres);
  const [genresdata,Setgenresdata] = useState<genresdata[]>([])

  const dispatch = useDispatch();
 
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    Setserachinput(event.target.value)
  }


  const GenresSearchhandleExec = async () => {
  //  genreLists
  // await genreLists
  const res = await execGenreSearch(searchinput)
  if (res.status === 200) {
    Setgenresdata(res.data.genres)
    console.log(res)
    console.log("aaaa")
  }
}

  useEffect(()=>{
    // GenresSearchhandleExec()
    const timer = setTimeout(() => {
      // console.log(data)
      // console.log("kkkkkkkkkkkkkkkkkk")
      // afterhandleChange(data.quicked)
      GenresSearchhandleExec()
    

    }, 500)

    return () => clearTimeout(timer)

  },[searchinput])

  const ref = useRef<HTMLDivElement>(null!);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      console.log(e.target)
      console.log(ref.current)
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
      // console.log("aa")
    };
  }, [isMenuOpen]);

  // 
  const delete_genres_handle = (id:number) => {
    // const name = (e.currentTarget as HTMLInputElement).dataset.id as string;
    // console.log(item)
    dispatch(deletingtodoGenresDataOneAction(String(id)));
  }


  return(
    <>  
      <div className= "genresSearch">
        <label>
          Genres
        </label>
        <div className = "genresSearch__contents"
        ref={ref}
       
        >
          {/* {!isMenuOpen && ( */}
            <div className ="header-search-contents__boxes__store">
            {!isMenuOpen && (
              <div className = "header-search-contents__boxes__store__re">
                {genreListsStore.janls_id_in.map(Number).filter(x=>x>0).map((item:number)=>{
                  return(
                    <>
                      <GenresTag
                      ishover = {ishover}
                      item = {item}
                      />
                    </>
                  )
                })}
              </div>
            )}
            </div> 
            <div className = "header-search-contents__boxes__store__right">
              <IoSearchCircle/>
            </div>
       
          
         
          <input 
            type="text" 
            name="genresearch"   
            value={searchinput} 
            // placeholder="ジャンルを入力してください"
            onChange={handleChange}
            onClick={() => setIsMenuOpen(true)}
            
            // onClick={handleClick}
            // onClick={() => setIsMenuOpen((oldState) => !oldState)}
              />
            
          <div className = "selected_style_icons">
            <HiChevronDoubleDown/>
          </div>
          {/* <HiChevronDoubleDown/> */}
          <div className = "genresSearch__contents__dummy">
        
          {isMenuOpen && (
          <GenresLists handle={1} isshow={show} genresdata={genresdata}/>
          )}
          </div>
        </div>
      </div>
    </>
  )
}