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
  // characterId:number
  castId:string
  characterName:string
  // characterImageUrl?:string
}

export const StaffRollsFormList:React.FC<Props> = (Props) => {
const [characterPlot,setCharacterPlot] = useState<character>()
const [roll,setRoll] = useState<string>("")
const [addError,setAddError]= useState<boolean>()
const handleChangeCharacterName = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  // console.log(index,e,castId)
  if(e ==undefined)return
  console.log(Props)
  const copy = Props.characterPlot.slice()
  const value = e?.target.value as string
  setRoll(value)
  copy[Props.index]={castId:Props.item.value,characterName:value}
  // Props.setCharacterPlot([Props.characterPlot[Props.index],{characterName:value,castId:Props.item.value}])
  // setCharacterPlot({castId:Props.item.value,characterName:value})
  Props.setCharacterPlot(copy)

}

const handleError = ():number => {
  console.log("aaa")
  let count = 0
  if(roll.length==0){
    setAddError(true)
    count += 1
  }
  Props.array.push(count)
  return count

}
  console.log(Props.childFunc01)


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
          // helperText={inputRef?.current?.validationMessage}
          // helperText={addGenreValidateText}
          onChange={handleChangeCharacterName}
          size="small"
          fullWidth
        />
      </div>
    </>
  )
}