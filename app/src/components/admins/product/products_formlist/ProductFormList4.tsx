


import { Button, MenuItem, SelectChangeEvent, TextField,Select as SelectMaterial, FormHelperText } from "@mui/material";
import { genre } from "@/interfaces/product";
import { execCreateCharacter, execGetCharacterList } from "@/lib/api/admin/character";
import { execCreateFormat, execGetFormatsList } from "@/lib/api/admin/formats";
import { execCreateGenreLib, execGetGenresList } from "@/lib/api/admin/janls";
import { execCreateStaffLib, execGetStaffList } from "@/lib/api/admin/staff";
import { execCreateStudiosLib, execGetStudiosList } from "@/lib/api/admin/studios";
import { useEffect, useRef, useState } from "react";
import Select, { InputActionMeta } from 'react-select'
import { CharactersFormList } from "./CharactersFormList";
import { StaffRollsFormList } from "./StaffRollsFormList";

type Props = {
  activeStep : number
  childFunc4: React.MutableRefObject<any>
  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void
  setStudiosArray: React.Dispatch<React.SetStateAction<string[]>>
  staffMiddle:character[]
  setStaffMiddle: React.Dispatch<React.SetStateAction<character[]>>
}

type selectOption = {
  value: string;
  label: string;
}
type character = {
  castId:string
  characterName:string
}
export const ProductFormList4:React.FC<Props> = (Props) => {
  const [characterPlot,setCharacterPlot] = useState<character[]>([])
  const childFunc01 = useRef<any>([])
  // message
  const [message,setMessage] = useState<string>("")
  // select staffs -----------------------------------------
  const [character,setCharacter] = useState<selectOption[]>([])
  const [characterIdList,setCharacterIdList] = useState<selectOption[]>([])
  const [addedCharacter,setAddedCharacter] = useState<string>("")
  const [staffValidateText,setStaffValidateText] = useState<string>("")

  useEffect(()=>{
    handleGetStaffList()
  },[addedCharacter])
  
  const handleGetStaffList = async() => {
    const res = await execGetStaffList()
    if (res.status == 200){
      setCharacter(res.data.staffs)
    }else{
    }
  }

  const handleSelectChangeCharacter = (value:any) => {
    const current_value = value.map((item:any) => item.value)
    setCharacterIdList(value)
      const character_filter = characterPlot.filter(item => current_value.includes(item.castId))
      childFunc01.current = childFunc01.current.filter((item:any) => current_value.includes(item.id))
      setCharacterPlot(character_filter)
      setStaffValidateText("")
  }
  // create staff -------------------------------------
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
    const res = await execCreateStaffLib(addCharacter)
    if (res.status == 200){
      if(res.data.status==200){
        setOnMessage(true)
        setMessage(`フォーマット(${res.data.staff.name})が追加されました`)
        setAddedCharacter(res.data.staff.name)
      }
    }else{
    }
  }
  // -----------------------------------------message
  const [onMessage,setOnMessage] = useState<boolean>(false)
  useEffect(() => {
    const interval = setInterval(() => {
        setOnMessage(false);
        setMessage("")
    }, 10000);
    return () => clearInterval(interval);
}, [message]);

// studio ---------------------------------------------------------------------------------------
const [genres,setGenres] = useState<selectOption[]>([])
const [genresIdList,setGenresIdList] = useState<selectOption[]>([])
const [addedGenre,setAddedGenre] = useState<string>("")
const [studioValidateText,setStudioValidateText] = useState<string>("")

useEffect(()=>{
  handleFirstGetStudiosList()
},[addedGenre])

const handleFirstGetStudiosList = async() => {
  const res = await execGetStudiosList()
  if (res.status == 200){
    setGenres(res.data.genres)
  }else{
  }
}

const selectChangehandle = (value:any) => {
  setGenresIdList(value)
  setStudioValidateText("")
}
// add Genre -----------------------------------------------------------
const [addGenre,setAddGenre] = useState<string | undefined>("")
const [addGenreError,setAddGenreEroor] = useState<boolean>(false)
const [addGenreValidateText,setaddGenreValidateText] = useState<string>()
const handleChangeAddGenre = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
  setAddGenre(e?.currentTarget.value)
  if(addGenreError==true){
    setAddGenreEroor(false)
    setaddGenreValidateText("")
  }
}
const handleSubmitGenres = async() => {
  if (addGenre==""||addGenre==undefined){
    setAddGenreEroor(true)
    setaddGenreValidateText("入力されていません")
    return
  }
  const res = await execCreateStudiosLib(addGenre)
  if (res.status == 200){
    if(res.data.status==200){
      setOnMessage(true)
      setMessage(`ジャンル(${res.data.genre.company})が追加されました`)
      setAddedGenre(res.data.genre.company)
    }
  }else{

  }
}
// ----------------------------------------
  const array:number[] = []
  const handleErrorCheck = () => {
    if(genresIdList.length==0){
      setStudioValidateText("選択されていません。")
      return
    }
    if(characterIdList.length==0){
      setStaffValidateText("選択されていません。")
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
    // state
    Props.setStudiosArray(genresIdList.map(item=>item.value))
    Props.setStaffMiddle(characterPlot)
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
  }
  const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    if(newValue==""){
      setIsMenuOpen(false)
    }else if(newValue.length>1){
      setIsMenuOpen(true)
    }
    
  }
  Props.childFunc4.current = handleErrorCheck
  return(
    <>
      {Props.completed[3]!=true?
      <div className = "Stepper4" style={Props.activeStep!=3?{display:"none"}:undefined}>
        <div className = {`FormProductList2Message ${onMessage == true?"activeFormProductList2Message":""}`}>
          {message}
        </div>
        <div className = "FormProductLabel">
          Staff & Studio情報の追加
        </div>
        <div className = "FormProductList2Genres">
          Studio
        </div>
        <Select
          placeholder={"Genres select..."}
          options={genres} 
          closeMenuOnSelect={false}
          isMulti
          value={genresIdList}
          onChange={selectChangehandle}
          styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
          />
          <FormHelperText className = "helpertexts">{studioValidateText}</FormHelperText>
          <div className = "FormProductList2AddGenreFlexBox">
          <TextField
            error={addGenreError}
            inputProps={{ maxLength: 30, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="スタジオを入力してください(30文字以内）"
            defaultValue=""
            id="outlined-basic"
            label="Add Studio"
            variant="outlined"
            helperText={addGenreValidateText}
            onChange={handleChangeAddGenre}
            size="small"
            fullWidth
          />
          <Button variant="contained"
            onClick = { handleSubmitGenres }
          >
            Add
          </Button>
        </div>
        {/* -------------------------------------------------------- */}
        <div className = "FormProductList2Genres">
          Staff
        </div>
        *2文字以上の入力が必要です。
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
        <FormHelperText className = "helpertexts">{staffValidateText}</FormHelperText>
        <div className = "FormProductList2AddGenreFlexBox">
        <TextField
          error={addCharacterError}
          inputProps={{ maxLength: 30, pattern: "^[a-zA-Z0-9_]+$" }}
          placeholder="Staffを入力してください(30文字以内）"
          defaultValue=""
          id="outlined-basic"
          label="Add Staff"
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
          Role
        </div>
        {characterIdList.map((item,index)=>{
          return(
            <StaffRollsFormList
              item={item}
              key={item.value}
              setCharacterPlot = {setCharacterPlot}
              characterPlot = {characterPlot} 
              index={index}
              childFunc01={childFunc01}
              array={array}
            />
          )
        })}
      </div>
      :<></>
      }
    </>
  )
}