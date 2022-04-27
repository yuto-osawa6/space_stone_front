import { Cast } from "@/interfaces/search";
import { execCastSearch } from "@/lib/api/main";
import { useEffect, useRef, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { IoSearchCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CastsLists } from "./CastsLists";
import { CastsTag } from "./CastsTag";

export const CastsSearch:React.FC = () => {
  // usestate
  const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
  const [searchinput,Setserachinput] = useState<string>("")
  const [CastData,SetCastData] = useState<Cast[]>([])
  // store
  const CastsStore = useSelector((state: RootState) => state.cast);
  // simpole method
  const menuopen = () => setIsMenuOpen(true)
  // ref
  const ref = useRef<HTMLDivElement>(null!);


  // method
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    Setserachinput(event.target.value)
  }
    useEffect(()=>{
      if (searchinput.length < 2){
        SetCastData([])
        return
      }

      const timer = setTimeout(() => {
        CastSearchhandleExec()
      }, 500)

      return () => clearTimeout(timer)

    },[searchinput])

    const CastSearchhandleExec = async () => {
      //  genreLists
      // await genreLists
      const res = await execCastSearch(searchinput)
      if (res.status === 200) {
        SetCastData(res.data.casts)
        console.log(res)
        console.log("aaaa")
      }
    }

  //
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


  return(
    <>
      <div className= "genresSearch">
        <label>
          Cast
        </label>
        <div className = "genresSearch__contents"
        ref={ref}
       
        >
            <div className ="header-search-contents__boxes__store">
            {!isMenuOpen && (
              <div className = "header-search-contents__boxes__store__re">
                {/* {CastsStore.casts_id_in.map(Number).filter(x=>x>0).map((item:number)=>{
                  return(
                    <>
                      <CastsTag
                      // ishover = {ishover}
                      item = {item}
                      // Casts = {}
                      />
                    </>
                  )
                })} */}
                {CastsStore.cast.map((item:Cast)=>{
                  return(
                    <>
                      <CastsTag
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
            onChange={handleChange}
            onClick={menuopen}

              />
            
          <div className = "selected_style_icons">
            <HiChevronDoubleDown/>
          </div>
          <div className = "genresSearch__contents__dummy">
        
          {isMenuOpen && (
            <>
              <CastsLists handle={1} CastsData={CastData}/>
            </>
          )}
          </div>
        </div>
      </div>
    </>
  )
}