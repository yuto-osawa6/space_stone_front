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
handleMoreCharacter: (item: selectOption) => void
}

type character = {
  castId:string
  characterName:string
  characterImage:string
}

type character1 = {
  characterName:string
  characterImage:string
}

export const CharactersFormList:React.FC<Props> = (Props) => {
const [plot,setPlot] = useState<character1>({characterName:"",characterImage:""})
const handleChangeCharacterName = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  if(e ==undefined)return
  const copy = Props.characterPlot.slice()
  const value = e?.target.value as string
  setPlot({characterName:value,characterImage:plot.characterImage})
  copy[Props.index]={castId:Props.item.value,characterName:value,characterImage:plot.characterImage}
  Props.setCharacterPlot(copy)
  setCharacterTitleError(false)
}

const handleChangeCharacterImage = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  if(e ==undefined)return
  const copy = Props.characterPlot.slice()
  const value = e?.target.value as string
  setPlot({characterName:plot.characterName,characterImage:value})
  copy[Props.index]={castId:Props.item.value,characterName:plot.characterName,characterImage:value}
  Props.setCharacterPlot(copy)
}
// -----------------------------------
const [characterTitleError,setCharacterTitleError] = useState<boolean>(false)
const [characterImageUrlError,setCharacterImageUrlError] = useState<boolean>(false)
const handleError = ():number => {
  let count = 0
  if(plot.characterName==""){
    setCharacterTitleError(true)
    count += 1
  }
  Props.array.push(count)
  return count
}
  Props.childFunc01.current[Props.index] = {id:Props.item.value,func:handleError}

  return(
    <>
      <div className = "CharacterList" >
        <div className = "CastTitle"
        onClick={()=>Props.handleMoreCharacter(Props.item)}
        >
          {Props.item.label}+l
        </div>
          <div className = "CharacterItemFlex"
          >
          <div
          >
          </div>
          <TextField
            error={characterTitleError}
            inputProps={{ maxLength: 50, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="character名を入力してください(50文字以内）"
            defaultValue=""
            id="outlined-basic"
            label="CharacterName"
            variant="outlined"
            onChange={handleChangeCharacterName}
            size="small"
            fullWidth
          />
          <TextField
            error={characterImageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="characterImageUrlを入力してください"
            defaultValue=""
            id="outlined-basic"
            label="CharacterImage"
            variant="outlined"
            onChange={handleChangeCharacterImage}
            size="small"
            fullWidth
          />
        </div>
      </div>
    </>
  )
}