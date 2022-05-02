// import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from "@mui/material"
// import { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useLocation, useNavigate } from "react-router-dom"
// import { RootState } from "store"
// import { SettingTimeSearchAction } from "store/during/actions"
// import { DestroySeasonSearchAction, SettingSeasonSearchAction } from "store/season/actions"
// // import { AllDeleteSubClassAction, DeilyEndQteQAction, DeilyStartQteQAction, SubNewSearchAction, SubPickupSearchAction, SubPrivateSearchAction } from "store/subsearches/actions"
// import { SettingYearSearchAction } from "store/year/actions"

export const SubSearches:React.FC = function SubSearchesFunc(){
  return(<>
  </>
  )
}
// type Props = {
//   subDefault: string
//   SetDefaultValue:React.Dispatch<React.SetStateAction<string>>

//   checked1:boolean
//   checked2:boolean
//   checked3:boolean
//   setChecked1: React.Dispatch<React.SetStateAction<boolean>>
//   setChecked2: React.Dispatch<React.SetStateAction<boolean>>
//   setChecked3: React.Dispatch<React.SetStateAction<boolean>>
// 

// export const SubSearches:React.FC<Props> = (Props) => {
//   // 
//   const navigate = useNavigate()
//   const location = useLocation()
//   // 
//   const isFirstRender = useRef(false)
//   const isFirstRender2 = useRef(false)
//   const isFirstRender3 = useRef(false)

//   useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
//     isFirstRender.current = true
//     isFirstRender2.current = true
//     isFirstRender3.current = true

//   }, [])
//   // console.log(Props)
//   const dispatch = useDispatch()

//   // const [defaultValue,SetDefaultValue] = useState<string>("")
//   const AllDeleteHandler = () => {
//     Props.SetDefaultValue("All")
//     // dispatch(AllDeleteSubClassAction())
//   }

//   const DeliveryEndQteQChangeHandler = () => {
//     console.log("あ")
//     Props.SetDefaultValue("DeliveryEndQteQ")

//   }

//   const DeliveryStartGteqChangeHandler = () => {
//     console.log("い")
//     Props.SetDefaultValue("DeliveryStart")
//   }

//   const PickupChangeHandler = () => {
//     console.log("う")
//     today.setHours(today.getHours() + 9)
//     Props.SetDefaultValue("PickUp")
//   }

//   // const  PrivateChangeHandler = () => {
//   //   console.log("え")
//   //   const today = new Date()
//   //   today.setHours(today.getHours() + 9)
//   //   // console.log(today)
//   //   dispatch(SubPrivateSearchAction(today,true))
//   // }
//   // const   NewChangeHandler = () => {
//   //   console.log("え")
//   //   const today = new Date()
//   //   today.setHours(today.getHours() + 9)
//   //   // console.log(today)
//   //   dispatch(SubNewSearchAction(today,true))
//   // }


//   // range 
//   const TimeStore = useSelector((state:RootState)=> state.timesearch)

//   const [ValueTime, setValueTime] = useState<number[]>(TimeStore.times.time_gteq==""&&TimeStore.times.time_lteq==""?[10,240]:TimeStore.time_range);
//   const [TimeGteq,setTimeGteq] = useState<string>(TimeStore.times.time_gteq==""?"00:10:00":TimeStore.times.time_gteq)
//   const [TimeLteq,setTimeLteq] = useState<string>(TimeStore.times.time_lteq==""?"03:50:00":TimeStore.times.time_lteq)

//   // const [checked1, setChecked1] = useState(TimeStore.times.time_gteq==""&&TimeStore.times.time_lteq==""?true:false);

//   const handleChangechecked1 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     Props.setChecked1(event.target.checked);

//   }
  

//   const handleChangeTime = (event: Event, newValue: number | number[]) => {
//     if(Props.checked1==true){
//       Props.setChecked1(false);
//     }
//     // setChecked1(false);
//     // setValueTime(newValue as number[]);

//     const time = newValue as number[]
//     setValueTime(time)
//     // const time = [10,20]
  
//     console.log(time)
//     if (time[0] < 60){
//       // const time_gteq = `00:${time[0]}:00`
//       const time_gteq = `00:${("0" + time[0]).slice(-2)}:00`
//       setTimeGteq(time_gteq)
//     } else if (time[0] >= 60 && time[0] < 120){
//        const time_gteq = `01:${("0" + (time[0]-60)).slice(-2)}:00`
//        setTimeGteq(time_gteq)
//     }else if (time[0] >= 120 && time[0] < 180){
//       const time_gteq = `02:${("0" + (time[0]-120)).slice(-2)}:00`
//       setTimeGteq(time_gteq)

//     }else if (time[0] >= 180 && time[0] < 240){
//       // const left = time[0] - 180
//       const time_gteq = `03:${("0" + (time[0]-180)).slice(-2)}:00`
//       setTimeGteq(time_gteq)
//       // console.log("d")
//       // console.log(`03:${left}:00`)
//     }

//     if (time[1] < 60){
//       const time_lteq = `00:${("0" + (time[1])).slice(-2)}:00`
//       setTimeLteq(time_lteq)
//     } else if (time[1] >= 60 && time[1] < 120){
//        const time_lteq = `01:${("0" + (time[1]-60)).slice(-2)}:00`
//        setTimeLteq(time_lteq)
//     }else if (time[1] >= 120 && time[1] < 180){
//       const time_lteq = `02:${("0" + (time[1]-120)).slice(-2)}:00`
//        setTimeLteq(time_lteq)
     
//     }else if (time[1] >= 180 && time[1] < 240){
//       const time_lteq = `03:${("0" + (time[1]-180)).slice(-2)}:00`
//       setTimeLteq(time_lteq)
//     }
//   }
  
//   // stores
//   const YearStore = useSelector((state:RootState)=> state.yearsearch)
//   const SeasonStore = useSelector((state:RootState)=> state.seasonsearch)

//   useEffect(()=>{
//     console.log(TimeGteq,TimeLteq,Props.checked1)
//     console.log("aaaa")
//     console.log(isFirstRender)
//     if(isFirstRender.current) { // 初回レンダー判定

//       isFirstRender.current = false // もう初回レンダーじゃないよ代入
//     } else {
//       const timer = setTimeout(() => {

//         if (Props.checked1==true){
//           dispatch(SettingTimeSearchAction("","",[0,240]))
//           }else{
//           dispatch(SettingTimeSearchAction(TimeGteq,TimeLteq,ValueTime))
//           }
//           if (location.pathname==="/search"){
//           }else{
//             navigate(`/search`)
//           }
  
//       }, 500)
  
//       return () => clearTimeout(timer)
//     }
    
//   },[TimeGteq,TimeLteq,Props.checked1])

  


//   const today = new Date()
//   const year = new Date().getFullYear();

//   // const [checked2, setChecked2] = useState(YearStore.year2_gteq==""&&YearStore.year2_lteq==""?true:false);

//   const handleChangechecked2 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     Props.setChecked2(event.target.checked);
//     // if (event.target.checked == true){
//     //   dispatch(SettingYearSearchAction("",""))
//     // }else{
//     //   dispatch(SettingYearSearchAction(`${YearGteq}-01-01`,`${YearLteq}-01-01`))
//     // }
//   }

//   // console.log(year)

//   // const [YearLteq,setYearLteq] = useState<string>(`${today.getFullYear()}`)

//   const [YearGteq,setYearGteq] = useState<number>(YearStore.year2_gteq==""?1940:Number(YearStore.year2_gteq.slice(0, 4)))
//   const [YearLteq,setYearLteq] = useState<number>(YearStore.year2_lteq==""?year:Number(YearStore.year2_lteq.slice(0, 4)))

//   const handleChangeYear = (event: Event, newValue2: number | number[]) => {
//     Props.setChecked2(false);
//     console.log(newValue2)
//     const item = newValue2 as number[]
//     // dispatch(SettingYearSearchAction(`${item[0]}-01-01`,`${item[1]}-01-01`))

//     // setYearGteq(`${item[0]}`)
//     // setYearLteq(`${item[1]}`)

//     setYearGteq(item[0])
//     setYearLteq(item[1])
//   }

//   useEffect(()=>{
//     console.log(isFirstRender2)
//     console.log(YearGteq,YearLteq,Props.checked2)
//     if(isFirstRender2.current) { // 初回レンダー判定
//       isFirstRender2.current = false // もう初回レンダーじゃないよ代入
//     } else {
//     const timer = setTimeout(() => {

//       if (Props.checked2==true){
//         dispatch(SettingYearSearchAction("",""))
//         }else{
//         dispatch(SettingYearSearchAction(`${YearGteq}-01-01`,`${YearLteq}-01-01`))
//         }
//         if (location.pathname==="/search"){
//         }else{
//           navigate(`/search`)
//         }

//     }, 500)

//     return () => clearTimeout(timer)
//   }
  
// },[YearGteq,YearLteq,Props.checked2])

//   // 
//   // const [checked3, setChecked3] = useState(SeasonStore.season_gteq==""&&SeasonStore.season_lteq==""?true:false);

//   const [SeasonGteq,setSeasonGteq] = useState<number>(SeasonStore.season_gteq==""?1:SeasonStore.season_gteq as number)
//   const [SeasonLteq,setSeasonLteq] = useState<number>(SeasonStore.season_lteq==""?18:SeasonStore.season_lteq as number)

//   const handleChangechecked3 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     Props.setChecked3(event.target.checked);
//     // if (event.target.checked == true){
//     //   dispatch(DestroySeasonSearchAction())
//     //   // dispatch(SettingSeasonSearchAction("",""))
//     // }else{
//     //   dispatch(SettingSeasonSearchAction(SeasonGteq,SeasonLteq))
//     // }
//   }

//   const handleChangeSeason = (event: Event, newValue2: number | number[]) => {
//     Props.setChecked3(false);
//     const item = newValue2 as number[]
//     setSeasonGteq( item[0] )
//     setSeasonLteq( item[1] )

//     // dispatch(SettingSeasonSearchAction(item[0],item[1]))
//   }

//   useEffect(()=>{
//     if(isFirstRender3.current) { // 初回レンダー判定
//       isFirstRender3.current = false // もう初回レンダーじゃないよ代入
//     } else {
//     console.log(YearGteq,YearLteq,Props.checked2)
//     const timer = setTimeout(() => {

//       if (Props.checked3==true){
//         dispatch(DestroySeasonSearchAction())
//         }else{
//         dispatch(SettingSeasonSearchAction(SeasonGteq,SeasonLteq))
//         }
//         if (location.pathname==="/search"){
//         }else{
//           navigate(`/search`)
//         }

//     }, 500)

//     return () => clearTimeout(timer)
//   }
  
// },[SeasonGteq,SeasonLteq,Props.checked3])
//   // 

//   const [defaultValueTime,SetDefaultValueTime] = useState<number>(TimeStore.times.time_gteq==""?10:TimeStore.time_range[0])
//   const [defaultValueTime2,SetDefaultValueTime2] = useState<number>(TimeStore.times.time_lteq==""?240:TimeStore.time_range[1])

//   const [defaultValueYear,SetDefaultValueYear] = useState<number>(YearStore.year2_gteq==""?1940:Number(YearStore.year2_gteq.slice(0, 4)))
//   const [defaultValueYear2,SetDefaultValueYear2] = useState<number>(YearStore.year2_lteq==""?year:Number(YearStore.year2_lteq.slice(0, 4)))

//   const [defaultValueSeason,SetDefaultValueSeason] = useState<number>(SeasonStore.season_gteq==""?1:SeasonStore.season_gteq as number)
//   const [defaultValueSeason2,SetDefaultValueSeason2] = useState<number>(SeasonStore.season_lteq==""?18:SeasonStore.season_lteq as number)

//   const SubStore = useSelector((state:RootState)=> state.subsearch)

//   useEffect(()=>{


//     setTimeGteq(TimeStore.times.time_gteq==""?"00:10:00":TimeStore.times.time_gteq)
//     setTimeLteq(TimeStore.times.time_lteq==""?"03:50:00":TimeStore.times.time_lteq)

//     setSeasonGteq(SeasonStore.season_gteq==""?1:SeasonStore.season_gteq as number)
//     setSeasonLteq(SeasonStore.season_lteq==""?18:SeasonStore.season_lteq as number)

//     console.log(YearStore.year_season_years_year_gteq)

//     setYearGteq(YearStore.year_season_years_year_gteq==""?1940:Number(YearStore.year_season_years_year_gteq.slice(0, 4)))
//     setYearLteq(YearStore.year_season_years_year_lteq==""?year:Number(YearStore.year_season_years_year_lteq.slice(0, 4)))



//   },[])

//   // useEffect(()=>{
//   //   Props.setTimeDefault(ValueTime)

//   // },[Props.MdMenuOpenState])
//   console.log(defaultValueTime)
//   // const [defaultValue,SetDefaultValue] = useState<string>("")

//   return(
//     <>
//       {/* {Props.subDefault} */}
      
//       <FormControl
//       className="SubSearches"
//       >
//       <FormLabel id="demo-row-radio-buttons-group-label">Categoryes</FormLabel>
//       <RadioGroup
//         row
//         // aria-labelledby="demo-row-radio-buttons-group-label"
//         name="row-radio-buttons-group"
//         defaultValue={Props.subDefault}
//       >
//         <FormControlLabel value="All" control={<Radio />} label="全ての作品" 
//         onChange={AllDeleteHandler}
//         />
//         <FormControlLabel value="DeliveryEndQteQ" control={<Radio />} label="終了予定作品" 
//         onChange={DeliveryEndQteQChangeHandler}
//         />
//         <FormControlLabel value="DeliveryStart" control={<Radio />} label="配信予定作品" 
//         onChange={DeliveryStartGteqChangeHandler}
//         />
//         <FormControlLabel value="PickUp" control={<Radio />} label="おすすめ作品" 
//         onChange={PickupChangeHandler}
//         />
//         {/* <FormControlLabel value="Private" control={<Radio />} label="非公開作品" 
//         onChange={PrivateChangeHandler}
//         />
//         <FormControlLabel value="New" control={<Radio />} label="新着作品" 
//         onChange={NewChangeHandler}
//         /> */}
      
//       </RadioGroup>
//     </FormControl>
//     <p className = "SubSearchestitle">時間（映画のみ）</p>
//     {TimeGteq}
//     　
//     {TimeLteq}
//     　
//     {/* {TimeStore.time_range} */}
//     {/* {ValueTime[0]} */}
//     {/* {Props.timeDefault} */}
//     <Checkbox checked={Props.checked1} onChange={handleChangechecked1}/>
//     <Slider
//       // aria-label="Temperature"
//       // defaultValue={[TimeStore.times.time_gteq==""?10:TimeStore.time_range[0],TimeStore.times.time_lteq==""?240:TimeStore.time_range[1]]}
//       defaultValue={[defaultValueTime,defaultValueTime2]}
//       // getAriaValueText={valuetext}
//       valueLabelDisplay="off"
//       step={10}
//       onChange={handleChangeTime}
//       // marks
//       min={10}
//       max={240}
//     />

//     <p className = "SubSearchestitle">年</p>
//     {YearGteq}
//     　
//     {YearLteq}
//     　
//     {/* {defaultValueYear} */}

//     <Checkbox checked={Props.checked2}onChange={handleChangechecked2}/>
//     <Slider
//       // aria-label="Temperature"
//       // defaultValue={[YearStore.year2_gteq==""?1940:Number(YearStore.year2_gteq.slice(0, 4)),YearStore.year2_lteq==""?year:Number(YearStore.year2_lteq.slice(0, 4))]}
//       // defaultValue={[YearStore.year2_gteq==""?1940:defaultValueYear,YearStore.year2_lteq==""?year:defaultValueYear2]}
//       defaultValue={[defaultValueYear,defaultValueYear2]}

//       // getAriaValueText={valuetext}
//       valueLabelDisplay="off"
//       step={1}
//       onChange={handleChangeYear}
//       // marks
//       min={1940}
//       max={year}
//     />

//     <p className = "SubSearchestitle">シーズン（TV番組・ドラマのみ）</p>
//     {SeasonGteq}
//     　
//     {SeasonLteq}
//     <Checkbox checked={Props.checked3} onChange={handleChangechecked3}/>
//     <Slider
//       // aria-label="Temperature"
//       // doneyet(動的に18を持ってくるかどうか)
//       defaultValue={[defaultValueSeason,defaultValueSeason2]}
//       valueLabelDisplay="off"
//       step={1}
//       onChange={handleChangeSeason}
//       // marks
//       min={1}
//       max={18}
//     />
//     </>
//   )
// }