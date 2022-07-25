import { TextField } from "@mui/material"
import { useState } from "react"

type selectOption = {
  value: string;
  label: string;
}
type Props = {
item:selectOption
setCharacterPlot: React.Dispatch<React.SetStateAction<character[]>>
characterPlot:character[]
index:number

childFunc01:React.MutableRefObject<any>
array: number[]
}

type character = {
  castId:string
  characterName:string
}

export const StaffRollsFormList:React.FC<Props> = (Props) => {
const [characterPlot,setCharacterPlot] = useState<character>()
const [roll,setRoll] = useState<string>("")
const [addError,setAddError]= useState<boolean>()
const handleChangeCharacterName = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  if(e ==undefined)return
  const copy = Props.characterPlot.slice()
  const value = e?.target.value as string
  setRoll(value)
  copy[Props.index]={castId:Props.item.value,characterName:value}
  Props.setCharacterPlot(copy)
}

const handleError = ():number => {
  let count = 0
  if(roll.length==0){
    setAddError(true)
    count += 1
  }
  Props.array.push(count)
  return count

}
  Props.childFunc01.current[Props.index] = {id:Props.item.value,func:handleError}
  return(
    <>
      <div className = "CharacterList" >
        <div className = "CastTitle">
        </div>
        {Props.item.label}
        <TextField
          error={addError}
          inputProps={{ maxLength: 50, pattern: "^[a-zA-Z0-9_]+$" }}
          placeholder="担当を入力してください(50文字以内）"
          defaultValue=""
          id="outlined-basic"
          label="担当・役割"
          variant="outlined"
          onChange={handleChangeCharacterName}
          size="small"
          fullWidth
        />
      </div>
    </>
  )
}