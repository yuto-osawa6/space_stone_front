import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { execPublishedAll } from "@/lib/api/admin/product"
import { useState } from "react"

type Props = {
  defaultYears: year[]
  openPublishedAll: boolean
  setOpenPublishedAll: React.Dispatch<React.SetStateAction<boolean>>
}
type year = {
  id:number
  year:string
}
export const PublishedAll:React.FC<Props> = (Props) => {
  const season = [{k:"冬",i:5},{k:"春",i:2},{k:"夏",i:3},{k:"秋",i:4}]
  const handleClose = () => Props.setOpenPublishedAll(false)
  const [seasons,setSeasons] = useState<string>("")
  const handleChangeSeasons= (e:SelectChangeEvent<string>) => {
    setSeasons(e.target.value)
  }
  const [years,setYears] = useState<string>("")
  const handleChangeYears= (e:SelectChangeEvent<string>) => {
    setYears(e.target.value)
  }
  const handleSubmit = async(number:number) => {
    if(years=="")return
    if(seasons=="")return
    const res = await execPublishedAll(number,years,seasons)
    if(res.status === 200){
    }else{
    }
  }
  return(
    <>
      <Modal
        open={Props.openPublishedAll}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "AdminsProduct">
            <div className = "FormProduct">    
            <FormControl
              style={{
                width:"200px",
              }}
              size="small"
              >
              <InputLabel id="demo-simple-select-label">Seasons Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={seasons}
                label="Seasons Select"
                onChange={handleChangeSeasons}
                size="small"
              >
                {season.map((item,index)=>{
                  return(
                  <MenuItem value={item.i} key={index}>{item.k}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl
              style={{
                width:"200px",
              }}
              size="small"
              >
              <InputLabel id="demo-simple-select-label">Years Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={years}
                label="Seasons Select"
                onChange={handleChangeYears}
                size="small"
              >
                {Props.defaultYears.map((item,index)=>{
                  return(
                  <MenuItem value={item.id} key={item.id}>{item.year.slice(0,4)}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
              <Button variant="contained"
                onClick = { ()=> handleSubmit(0) }
                >
                Submit(非公開)
              </Button>
              <Button variant="contained"
                onClick = { ()=>handleSubmit(1) }
                >
                Submit(公開)
              </Button>
            </div>
          </div>
        </>
      </Modal>
    </>
  )
}