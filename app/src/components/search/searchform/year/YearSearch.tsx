import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { DestroyYearSearchAction, SettingYearSearchAction } from "@/store/year/actions"

type Props = {
}


export const YearSearch:React.FC<Props> = function YearSearchFunc(Props){
  // 
  const router = useRouter()
  const dispatch = useDispatch()
  const isFirstRender = useRef(false)
  const isFirstRender2 = useRef(false)
  const isFirstRender3 = useRef(false)

  useEffect(() => {
    isFirstRender.current = true
    isFirstRender2.current = true
    isFirstRender3.current = true

  }, [])
  const YearStore = useSelector((state:RootState)=> state.yearsearch)
  const today = new Date()
  const year = new Date().getFullYear();
  const handleChangechecked2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    const timer = setTimeout(() => {
      if (event.target.checked){
        dispatch(DestroyYearSearchAction())
        }else{
        dispatch(SettingYearSearchAction(`${YearGteq}-01-01`,`${YearLteq}-01-01`))
        } 
        if (router.pathname==="/search"){
        }else{
          router.push(`/search`)
        }
    }, 500)

    return () => clearTimeout(timer)
  }
  const [YearGteq,setYearGteq] = useState<number>(YearStore.years.year_season_years_year_gteq==""?2000:Number(YearStore.years.year_season_years_year_gteq.slice(0, 4)))
  const [YearLteq,setYearLteq] = useState<number>(YearStore.years.year_season_years_year_lteq==""?year:Number(YearStore.years.year_season_years_year_lteq.slice(0, 4)))
  const [checked,setChecked] = useState<boolean>(true)
  const handleChangeYear = (event: Event, newValue2: number | number[]) => {
    setChecked(false);
    const item = newValue2 as number[]
    setYearGteq(item[0])
    setYearLteq(item[1])
  }

  useEffect(()=>{
    if(isFirstRender2.current) {
      isFirstRender2.current = false 
    } else {
    const timer = setTimeout(() => {
      if (checked==true){
        dispatch(DestroyYearSearchAction())
        }else{
        dispatch(SettingYearSearchAction(`${YearGteq}-01-01`,`${YearLteq}-01-01`))
        }
        
        if (router.pathname==="/search"){
        }else{
          router.push(`/search`)
        }
    }, 500)
    return () => clearTimeout(timer)
    }
  },[YearGteq,YearLteq])

  useEffect(()=>{
    setChecked(YearStore.checked)
  },[YearStore.checked])

  return(
    <>
    <div className ="styles">
      <div className = "YearSearches">
      <label>
        Year
      </label>
      <Checkbox checked={checked}onChange={handleChangechecked2} style={{padding:"0px",marginBottom:"7px"}}/>
      </div>
      <div className = "YearSearches2">
        <Slider
          className="YearSearches2Slider"
          defaultValue={[2000,new Date().getFullYear()]}
          valueLabelDisplay="off"
          step={1}
          onChange={handleChangeYear}
          min={2000}
          max={year}
        />
      </div>
    </div>
    </>
  )
}