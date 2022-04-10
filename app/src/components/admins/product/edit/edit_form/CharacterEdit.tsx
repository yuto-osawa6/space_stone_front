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
// childFunc01:{[
//   current:any
// ]};
childFunc01:React.MutableRefObject<any>
array: number[]
handleMoreCharacter: (item: selectOption) => void
}

type character = {
  // characterId:number
  id:number | null
  castId:string
  characterName:string
  characterImage:string
  // characterImageUrl?:string
}

type character1 = {
  characterName:string
  characterImage:string
}

export const CharacterEdit:React.FC<Props> = (Props) => {
// const [characterPlot,setCharacterPlot] = useState<character>()
const [plot,setPlot] = useState<character1>({characterName:Props.characterPlot[Props.index]!=undefined?Props.characterPlot[Props.index].characterName:"",characterImage:Props.characterPlot[Props.index]!=undefined?Props.characterPlot[Props.index].characterImage:""})
const handleChangeCharacterName = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  // console.log(index,e,castId)
  if(e ==undefined)return
  console.log(Props)
  const copy = Props.characterPlot.slice()
  const value = e?.target.value as string
  setPlot({characterName:value,characterImage:plot.characterImage})
  copy[Props.index]={id:Props.characterPlot[Props.index]!=undefined?Props.characterPlot[Props.index].id:null,castId:Props.item.value,characterName:value,characterImage:plot.characterImage}
  // Props.setCharacterPlot([Props.characterPlot[Props.index],{characterName:value,castId:Props.item.value}])
  // setCharacterPlot({castId:Props.item.value,characterName:value})
  Props.setCharacterPlot(copy)
  setCharacterTitleError(false)

}

const handleChangeCharacterImage = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  // console.log(index,e,castId)
  if(e ==undefined)return
  console.log(Props)
  const copy = Props.characterPlot.slice()
  const value = e?.target.value as string
  setPlot({characterName:plot.characterName,characterImage:value})
  copy[Props.index]={id:Props.characterPlot[Props.index]!=undefined?Props.characterPlot[Props.index].id:null,castId:Props.item.value,characterName:plot.characterName,characterImage:value}
  Props.setCharacterPlot(copy)

}
// -----------------------------------
const [characterTitleError,setCharacterTitleError] = useState<boolean>(false)
const [characterImageUrlError,setCharacterImageUrlError] = useState<boolean>(false)
// const [jugde,setJugde] = useState
const handleError = ():number => {
  console.log("aaa")
  let count = 0
  if(plot.characterName==""){
    setCharacterTitleError(true)
    // return
    count += 1
  }
  // if(plot.characterImage==""){
  // setCharacterImageUrlError(true)
  //   count += 1
  //   // return/
  // }
  Props.array.push(count)
  console.log(Props.childFunc01)


  // return Props.array
  return count

}
  // Props.childFunc01.current[Props.index] = handleError
  // console.log(Props.childFunc01)
  // console.log(Props.childFunc01)
  console.log(Props.childFunc01)


  Props.childFunc01.current[Props.index] = {id:Props.item.value,func:handleError}

  console.log(Props)

  return(
    <>
      <div className = "CharacterList" >
        <div className = "CastTitle"
         onClick={()=>Props.handleMoreCharacter(Props.item)}
        >
          {Props.item.label}+l
        </div>
          <div className = "CharacterItemFlex"
          // onClick={()=>console.log("aaaa")
          // }
          >
          <div
            // onClick={()=>Props.handleMoreCharacter(Props.item)}
          >
            {/* {Props.item.label}+l */}
          </div>
          <TextField
            error={characterTitleError}
            inputProps={{ maxLength: 50, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="character名を入力してください(50文字以内）"
            defaultValue={Props.characterPlot[Props.index]!=undefined?Props.characterPlot[Props.index].characterName:""}
            id="outlined-basic"
            label="CharacterName"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={addGenreValidateText}
            onChange={handleChangeCharacterName}
            size="small"
            fullWidth
          />
          <TextField
            error={characterImageUrlError}
            inputProps={{ maxLength: 1000, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="characterImageUrlを入力してください"
            defaultValue={Props.characterPlot[Props.index]!=undefined?Props.characterPlot[Props.index].characterImage:""}
            id="outlined-basic"
            label="CharacterImage"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            // helperText={addGenreValidateText}
            onChange={handleChangeCharacterImage}
            size="small"
            fullWidth
          />
        </div>
      </div>
    </>
  )
}