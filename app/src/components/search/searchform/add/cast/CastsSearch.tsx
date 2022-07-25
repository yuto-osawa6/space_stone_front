import { Cast } from "@/interfaces/search";
import { execCastSearch } from "@/lib/api/main";
import { useEffect, useRef, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { IoSearchCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CastsLists } from "./CastsLists";
import { CastsTag } from "./CastsTag";

export const CastsSearch:React.FC = function CastsSearchFunc(){
  // usestate
  const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
  const [searchinput,Setserachinput] = useState<string>("")
  const [CastData,SetCastData] = useState<Cast[]>([])
  const CastsStore = useSelector((state: RootState) => state.cast);
  const menuopen = () => setIsMenuOpen(true)
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
      const res = await execCastSearch(searchinput)
      if (res.status === 200) {
        SetCastData(res.data.casts)
      }
    }

  useEffect(() => {
    const checkIfClickedOutside = (e:any) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
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
                {CastsStore.cast.map((item:Cast)=>{
                  return(
                    <>
                      <CastsTag
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