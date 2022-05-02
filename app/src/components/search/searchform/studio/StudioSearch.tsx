import { execStudioSearch } from "@/lib/api/main";
import { useEffect, useRef, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { IoSearchCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { GenresLists } from "../GenresLists";
import { GenresTag } from "../GenresTag";
import { StudiosLists } from "./StudioLists";
import { StudiosTag } from "./StudioTag";


interface Studios{
  id:number
  company:string
}

export const StudioSearch:React.FC= function StudioSearchFunc(){

  const [searchinput,Setserachinput] = useState<string>("")
  const [ishover, setIshover] = useState(false);
  const [studiosData,setStudiosData] = useState<Studios[]>([])

  const StudiosStore = useSelector((state: RootState) => state.studios);


  const dispatch = useDispatch();
 
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    Setserachinput(event.target.value)
  }


  const GenresSearchhandleExec = async () => {
  const res = await execStudioSearch(searchinput)
  if (res.status === 200) {
    setStudiosData(res.data.studios)
    console.log(res)
    console.log("aaaa")
  }
}

  useEffect(()=>{

    const timer = setTimeout(() => {
      GenresSearchhandleExec()
    }, 500)

    return () => clearTimeout(timer)

  },[searchinput])

  // ----------------------------------------------------

  const ref = useRef<HTMLDivElement>(null!);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      console.log(e.target)
      console.log(ref.current)
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);


  const delete_genres_handle = (id:number) => {
    // const name = (e.currentTarget as HTMLInputElement).dataset.id as string;
    // console.log(item)
    // dispatch(deletingtodoGenresDataOneAction(String(id)));
  }


  return(
    <>  
      <div className= "genresSearch">
        <label>
          Studios
        </label>
        <div className = "genresSearch__contents"
        ref={ref}
       
        >
          <div className ="header-search-contents__boxes__store">
            {!isMenuOpen && (
              <div className = "header-search-contents__boxes__store__re">
                {/* {StudiosStore.studioss_id_in.map(Number).filter(x=>x>0).map((item:number)=>{
                  return(
                    <>
                      <GenresTag
                      ishover = {ishover}
                      item = {item}
                      />
                    </>
                  )
                })} */}
                {StudiosStore.studio.map((item:Studios)=>{
                  return(
                    <>
                      <StudiosTag
                      // ishover = {ishover}
                      item = {item}
                      // Casts = {}
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
            <StudiosLists handle={1} studiosData={studiosData}/>
          )}
          </div>
        </div>
      </div>
    </>
  )
}