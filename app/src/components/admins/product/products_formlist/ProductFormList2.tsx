import { Button, MenuItem, SelectChangeEvent,FormHelperText, TextField,Select as SelectMaterial } from "@mui/material";
import { genre } from "@/interfaces/product";
import { execCreateFormat, execGetFormatsList } from "@/lib/api/admin/formats";
import { execCreateGenreLib, execGetGenresList } from "@/lib/api/admin/janls";
import { useEffect, useState } from "react";
import Select from 'react-select'

type Props = {
  activeStep : number
  childFunc2: React.MutableRefObject<any>
  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void
  setFormatsArray:React.Dispatch<React.SetStateAction<string[]>>
  setGenresArray: React.Dispatch<React.SetStateAction<string[]>>
  formatsArray: string[]
}

type selectOption = {
  value: string;
  label: string;
}

export const ProductFormList2:React.FC<Props> = (Props) => {
  const [message,setMessage] = useState<string>("")
  // select formats -----------------------------------------
  const [formats,setFormats] = useState<selectOption[]>([])
  const [formatsIdList,setFormatsIdList] = useState<selectOption>()
  const [addedFormat,setAddedFormat] = useState<string>("")
  const [formatsValidationText,setFormatValidationText] =  useState<string>()
  useEffect(()=>{
    handleGetFormatsList()
  },[addedFormat])
  
  const handleGetFormatsList = async() => {
    const res = await execGetFormatsList()
    if (res.status == 200){
      setFormats(res.data.styles)
    }else{
    }
  }
  const handleSelectChangeFormats = (value:any) => {
    setFormatsIdList(value)
    setFormatValidationText("")
  }
  // create formats -------------------------------------
  const [addFormat,setAddFormat] = useState<string | undefined>("")
  const [addFormatError,setAddFormatEroor] = useState<boolean>(false)
  const [addFormatValidateText,setAddFormatValidateText] = useState<string>()
  const handleChangeAddFormat = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setAddFormat(e?.currentTarget.value)
    if(addFormatError==true){
      setAddFormatEroor(false)
      setAddFormatValidateText("")
    }
  }
  const handleSubmitFormats = async() => {
    if (addFormat==""||addFormat==undefined){
      setAddFormatEroor(true)
      setAddFormatValidateText("入力されていません")
      return
    }
    const res = await execCreateFormat(addFormat)
    if (res.status == 200){
      if(res.data.status==200){
        setOnMessage(true)
        setMessage(`フォーマット(${res.data.style.name})が追加されました`)
        setAddedFormat(res.data.style.name)
      }
    }else{
    }
  }
  // -----------------------------------------select genres
  const [genres,setGenres] = useState<selectOption[]>([])
  const [genresIdList,setGenresIdList] = useState<selectOption[]>([])
  const [addedGenre,setAddedGenre] = useState<string>("")

  useEffect(()=>{
    handleFirstGetGenresList()
  },[addedGenre])
  
  const handleFirstGetGenresList = async() => {
    const res = await execGetGenresList()
    if (res.status == 200){
      setGenres(res.data.genres)
    }else{

    }
  }

  const selectChangehandle = (value:any) => {
    setGenresIdList(value)
    setGenresValidationText("")
  }
  // add Genre -----------------------------------------------------------
  const [addGenre,setAddGenre] = useState<string | undefined>("")
  const [addGenreError,setAddGenreEroor] = useState<boolean>(false)
  const [addGenreValidateText,setaddGenreValidateText] = useState<string>()
  const [genresValidationText,setGenresValidationText] = useState<string>()
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
    const res = await execCreateGenreLib(addGenre)
    if (res.status == 200){
      if(res.data.status==200){
        setOnMessage(true)
        setMessage(`ジャンル(${res.data.genre.name})が追加されました`)
        setAddedGenre(res.data.genre.name)
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

  // ------------------
  const handleErrorCheck = () =>{
    if(formatsIdList==undefined){
      setFormatValidationText("formatが選択されていません。")
      return
    }
    if(genresIdList.length==0){
      setGenresValidationText("genreが選択されていません。")
      return
    }
    Props.setFormatsArray([formatsIdList.value])
    Props.setGenresArray(genresIdList.map(item=>item.value))
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
  }

  Props.childFunc2.current = handleErrorCheck

  return(
    <>
    {Props.completed[1]!=true?
      <div className = "Stepper2" style={Props.activeStep!=1?{display:"none"}:undefined}>
        <div className = {`FormProductList2Message ${onMessage == true?"activeFormProductList2Message":""}`}>
          {message}
        </div>
        <div className = "FormProductLabel">
          Formats & Genres情報の追加
        </div>
        <div className = "FormProductList2Genres">
          Formats
        </div>
        <FormHelperText className = "helpertexts">{formatsValidationText}</FormHelperText>
        <Select
          placeholder={"Formats select..."}
          options={formats} 
          isSearchable={false}
          closeMenuOnSelect={false}
          value={formatsIdList}
          onChange={handleSelectChangeFormats}
          styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
          />
        <div className = "FormProductList2AddGenreFlexBox">
        <TextField
          error={addFormatError}
          inputProps={{ maxLength: 30, pattern: "^[a-zA-Z0-9_]+$" }}
          placeholder="フォーマットを入力してください(30文字以内）"
          defaultValue=""
          id="outlined-basic"
          label="Add Format"
          variant="outlined"
          helperText={addFormatValidateText}
          onChange={handleChangeAddFormat}
          size="small"
          fullWidth
        />
        <Button variant="contained"
          onClick = { handleSubmitFormats }
        >
          Add
        </Button>
        </div>
        <div className = "FormProductList2Genres">
          Genres
        </div>
        <FormHelperText className = "helpertexts">{genresValidationText}</FormHelperText>
        <Select
          placeholder={"Genres select..."}
          options={genres} 
          closeMenuOnSelect={false}
          isMulti
          value={genresIdList}
          onChange={selectChangehandle}
          styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
          />
          <div className = "FormProductList2AddGenreFlexBox">
          <TextField
            error={addGenreError}
            inputProps={{ maxLength: 30, pattern: "^[a-zA-Z0-9_]+$" }}
            placeholder="ジャンルを入力してください(30文字以内）"
            defaultValue=""
            id="outlined-basic"
            label="Add Genre"
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
      </div>
      :
      <>
      </>
      }
    </>
  )
}