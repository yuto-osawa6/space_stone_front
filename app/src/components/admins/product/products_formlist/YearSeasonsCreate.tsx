import { FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useState } from "react"

type Props = {
  item:string
  yearSeason: year_season[]
  setYearSeason: React.Dispatch<React.SetStateAction<year_season[]>>
  index:number
  childFunc01: React.MutableRefObject<any>
}
type year_season = {
  year:string
  season:string[]
}

export const YearSeasonsCreate:React.FC<Props> = (Props) => {
  const [plot,setPlot] = useState<year_season>({year:Props.item,season:Props.yearSeason[Props.index]!=undefined?Props.yearSeason[Props.index].season:[]})

 // kisetsu--------------------------------------------------------
  const [kisetsu,setKisetsu] = useState<string[]>(Props.yearSeason[Props.index]!=undefined?Props.yearSeason[Props.index].season:[])
  const [kisetsuValidationText,setKisetsuValidationText] = useState<string>("")
  const [kisetsuError,setKisetsuError] = useState<boolean>(false)

  const handleChangeKisetsu = (e:SelectChangeEvent<string[]>) => {
  const {
    target: { value },
  } = e;
  setKisetsu(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
  setKisetsuValidationText("")
  setKisetsuError(false)
  // -------------------------------------------------
  const copy = Props.yearSeason.slice()
  setPlot({year:Props.item,season: typeof value === 'string' ? value.split(',') : value})
  copy[Props.index]={year:Props.item,season: typeof value === 'string' ? value.split(',') : value}
  Props.setYearSeason(copy)
}

//  error----------------------------------------------------------------
const handleError = ():number => {
  let count = 0
  if(plot.season.length==0){
    setKisetsuError(true)
    count += 1
  }
  return count
}

Props.childFunc01.current[Props.index] = {id:Props.item,func:handleError}

  return(
    <>
      {Props.item}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">季節</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={kisetsu}
          label="季節"
          multiple
          onChange={handleChangeKisetsu}
          size="small"
          error={kisetsuError}
        > 
          <MenuItem value={1} >All</MenuItem>
          <MenuItem value={2} >春</MenuItem>
          <MenuItem value={3} >夏</MenuItem>
          <MenuItem value={4} >秋</MenuItem>
          <MenuItem value={5} >冬</MenuItem>
          <MenuItem value={6} >不定期</MenuItem>
        </Select>
        <FormHelperText className = "helpertexts">{kisetsuValidationText}</FormHelperText>
      </FormControl>
    </>
  )
}