
import { Button, MenuItem, SelectChangeEvent, TextField,Select as SelectMaterial, FormHelperText } from "@mui/material";
import { genre } from "@/interfaces/product";
import { execCreateCharacter, execGetCharacterList } from "@/lib/api/admin/character";
import { execCreateFormat, execGetFormatsList } from "@/lib/api/admin/formats";
import { execCreateGenreLib, execGetGenresList } from "@/lib/api/admin/janls";
import { useEffect, useRef, useState } from "react";
import Select, { InputActionMeta } from 'react-select'
import { CharactersFormList } from "./CharactersFormList";

type Props = {
  activeStep : number
  childFunc3: React.MutableRefObject<any>
  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void
  setCharacterMiddleData: React.Dispatch<React.SetStateAction<character[]>>
  characterMiddleData: character[]
}

type selectOption = {
  value: string;
  label: string;
}

type character = {
  castId:string
  characterName:string
  characterImage:string
}
export const ProductFormList3:React.FC<Props> = (Props) => {
  const [characterPlot,setCharacterPlot] = useState<character[]>([])
  const childFunc01 = useRef<any>([])
  // message
  const [message,setMessage] = useState<string>("")
  // select casts -----------------------------------------
  const [character,setCharacter] = useState<selectOption[]>([])
  const [characterIdList,setCharacterIdList] = useState<selectOption[]>([])
  const [characterIdList2,setCharacterIdList2] = useState<selectOption[]>([])
  const [addedCharacter,setAddedCharacter] = useState<string>("")
  useEffect(()=>{
    handleGetCharacterList()
  },[addedCharacter])
  
  const handleGetCharacterList = async() => {
    const res = await execGetCharacterList()
    if (res.status == 200){
      setCharacter(res.data.casts)
    }else{
    }
  }

  const [preLength,setPreLength] = useState<number>(0)
  const handleSelectChangeCharacter = (value:any) => {
    setCharacterValidateText("")
    const current_value = value.map((item:any) => item.value)
    setCharacterIdList(value)
    // 2------------------------------------------------
    const current_value2 = characterIdList2.map((item:any) => item.value)
    const last = value.slice(-1)[0]
    if(preLength<value.length){
      setCharacterIdList2(characterIdList2.filter(item => current_value.includes(item.value)).concat(last))
    }else{
      setCharacterIdList2(characterIdList2.filter(item => current_value.includes(item.value)))
    }
      setPreLength(value.length)
      const character_filter = characterPlot.filter(item => current_value.includes(item.castId))
      childFunc01.current = childFunc01.current.filter((item:any) => current_value.includes(item.id))
      setCharacterPlot(character_filter)
  }
  // create casts -------------------------------------
  const [addCharacter,setAddCharacter] = useState<string | undefined>("")
  const [addCharacterError,setAddCharacterEroor] = useState<boolean>(false)
  const [addCharacterValidateText,setAddCharacterValidateText] = useState<string>()
  const handleChangeAddCharacter = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setAddCharacter(e?.currentTarget.value)
    if(addCharacterError==true){
      setAddCharacterEroor(false)
      setAddCharacterValidateText("")
    }
  }
  const handleSubmitCharacter = async() => {
    if (addCharacter==""||addCharacter==undefined){
      setAddCharacterEroor(true)
      setAddCharacterValidateText("入力されていません")
      return
    }
    const res = await execCreateCharacter(addCharacter)
    if (res.status == 200){
      if(res.data.status==200){
        setOnMessage(true)
        setMessage(`スタッフ(${res.data.cast.name})が追加されました`)
        setAddedCharacter(res.data.cast.name)
      }
    }else{
    }
  }
  const [onMessage,setOnMessage] = useState<boolean>(false)
  useEffect(() => {
    const interval = setInterval(() => {
        setOnMessage(false);
        setMessage("")
    }, 10000);
    return () => clearInterval(interval);
}, [message]);
// select----------------------------------------------
const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if(newValue==""){
      setIsMenuOpen(false)
    }else if(newValue.length>1){
      setIsMenuOpen(true)
    }
  }
  // error ------------------
  const [characterValidateText,setCharacterValidateText] = useState<string>("")
  const array:number[] = []
  const handleErrorCheck = () =>{
    if(characterIdList.length == 0){
      setCharacterValidateText("選択されていません。")
      return
    }
    const array:number[] = []
    childFunc01.current.map((i:Function,index:number)=>
    array.push(childFunc01.current[index].func())
    )
    let total = array.reduce(function(sum, element){
      return sum + element;
    }, 0);
    if(total>0){
      return
    }
    Props.setCharacterMiddleData(characterPlot)
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
  }
    const handleMoreCharacter = (item:selectOption) => {
      setCharacterIdList2([...characterIdList2,item])
    }
  Props.childFunc3.current = handleErrorCheck

  return(
    <>
    {Props.completed[2]!=true?
      <div className = "Stepper3" style={Props.activeStep!=2?{display:"none"}:undefined}>
        <div className = {`FormProductList2Message ${onMessage == true?"activeFormProductList2Message":""}`}>
          {message}
        </div>
        <div className = "FormProductLabel">
          Character & Cast情報の追加
        </div>
        <div className = "FormProductList2Genres">
          Casts
        </div>
        *2文字以上の入力が必要です。
        <FormHelperText className = "helpertexts">{characterValidateText}</FormHelperText>
        <Select
          placeholder={"Characters select..."}
          options={character} 
          closeMenuOnSelect={false}
          isMulti
          value={characterIdList}
          menuIsOpen={isMenuOpen}
          onChange={handleSelectChangeCharacter}
          styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
          onInputChange={handleInputChange}
          />
        <div className = "FormProductList2AddGenreFlexBox">
        <TextField
          error={addCharacterError}
          inputProps={{ maxLength: 30, pattern: "^[a-zA-Z0-9_]+$" }}
          placeholder="Characterを入力してください(30文字以内）"
          defaultValue=""
          id="outlined-basic"
          label="Add Character"
          variant="outlined"
          helperText={addCharacterValidateText}
          onChange={handleChangeAddCharacter}
          size="small"
          fullWidth
        />
        <Button variant="contained"
          onClick = { handleSubmitCharacter }
        >
          Add
        </Button>
        </div>
        <div className = "FormProductList2Genres">
          Character
        </div>
          {characterIdList2.map((item,index)=>{
          return(
            <CharactersFormList
              item={item}
              key={index}
              setCharacterPlot = {setCharacterPlot}
              characterPlot = {characterPlot} 
              index={index}
              childFunc01={ childFunc01}
              array={array}
              handleMoreCharacter={handleMoreCharacter}
            />
          )
        })}
      </div>
      :<></>
      }
    </>
  )
}