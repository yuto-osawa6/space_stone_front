
import { Button, MenuItem, SelectChangeEvent, TextField,Select as SelectMaterial, FormHelperText } from "@mui/material";
// import { Select as SelectMaterial} fo
import { genre, productForm } from "interfaces/product";
import { execCreateCharacter, execGetCharacterList } from "lib/api/admin/character";
import { execCreateFormat, execGetFormatsList } from "lib/api/admin/formats";
import { execCreateGenreLib, execGetGenresList } from "lib/api/admin/janls";
import { useEffect, useRef, useState } from "react";
// import Select from "react-select/dist/declarations/src/Select";
import Select, { InputActionMeta } from 'react-select'
import { CharacterEdit } from "./CharacterEdit";
// import { CharactersFormList } from "./CharactersFormList";

type Props = {
  activeStep : number

  childFunc3: React.MutableRefObject<any>

  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void

  setCharacterMiddleData: React.Dispatch<React.SetStateAction<character[]>>
  characterMiddleData: character[]

   // formProduct
   formProduct:productForm
}

type selectOption = {
  value: string;
  label: string;
}

type character = {
  // characterId:number
  id:number | null
  castId:string
  characterName:string
  characterImage:string
  // characterImageUrl?:string

}
export const ProductFormList3Edit:React.FC<Props> = (Props) => {
  const [characterPlot,setCharacterPlot] = useState<character[]>(Props.formProduct.formCharacter)
  const childFunc01 = useRef<any>([])

  // const ota1 = (number:string,number2:number) => {
  //   const humans_copy = characterPlot.slice();
  //   console.log(humans_copy)
  //   humans_copy[0]={castId:"5",characterName:"a"}
  //   setCharacterPlot(humans_copy)

  //   // setCharacterPlot(characterPlot,{characterName:number,castId:String(number2)})
  //   // setCharacterPlot([...characterPlot[1],{characterName:number,castId:String(number2)}])
  // }
  // console.log(characterPlot[0])

  // message
  const [message,setMessage] = useState<string>("")

  // select casts -----------------------------------------
  const [character,setCharacter] = useState<selectOption[]>([])
  const [characterIdList,setCharacterIdList] = useState<selectOption[]>(Props.formProduct.formCast.filter((element, index, self) => self.findIndex(e => e.label === element.label &&e.value === element.value) === index))
  const [characterIdList2,setCharacterIdList2] = useState<selectOption[]>(Props.formProduct.formCast)
  const [addedCharacter,setAddedCharacter] = useState<string>("")

  useEffect(()=>{
    handleGetCharacterList()
  },[addedCharacter])
  
  const handleGetCharacterList = async() => {
    const res = await execGetCharacterList()
    if (res.status == 200){
      console.log(res)
      setCharacter(res.data.casts)
    }else{

    }
  }

  const [preLength,setPreLength] = useState<number>(Props.formProduct.formCharacter.length)
  const handleSelectChangeCharacter = (value:any) => {
    setCharacterValidateText("")
    const current_value = value.map((item:any) => item.value)
    setCharacterIdList(value)
    // 2------------------------------------------------
    const current_value2 = characterIdList2.map((item:any) => item.value)
    const last = value.slice(-1)[0]
    console.log(current_value2)
    console.log(current_value)
    console.log(last)
    console.log(preLength)

    if(preLength<value.length){
      // console.log("000000000000000")
    console.log(characterIdList2.filter(item => current_value.includes(item.value)).concat(last))
      setCharacterIdList2(characterIdList2.filter(item => current_value.includes(item.value)).concat(last))
    }else{
      // console.log("falsesssss")
      setCharacterIdList2(characterIdList2.filter(item => current_value.includes(item.value)))
    }
    // setCharacterIdList2(characterIdList2.filter(item => current_value.includes(item.value)))
    // setCharacterPlot([])
    // if(characterPlot.length<value.length){
      setPreLength(value.length)

      // -------------------------------------------------

    
      const character_filter = characterPlot.filter(item => current_value.includes(item.castId))
      childFunc01.current = childFunc01.current.filter((item:any) => current_value.includes(item.id))

      setCharacterPlot(character_filter)
    // }
  
  }

  // create casts -------------------------------------
  const [addCharacter,setAddCharacter] = useState<string | undefined>("")
  const [addCharacterError,setAddCharacterEroor] = useState<boolean>(false)
  const [addCharacterValidateText,setAddCharacterValidateText] = useState<string>()
  // const [addedGenre,setAddedGenre] = useState<string>("")
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
      console.log(res)
      if(res.data.status==200){
        setOnMessage(true)
        setMessage(`スタッフ(${res.data.cast.name})が追加されました`)
        setAddedCharacter(res.data.cast.name)
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

// select----------------------------------------------

const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)
  const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
    console.log(newValue,actionMeta)
    if(newValue==""){
      setIsMenuOpen(false)
    }else if(newValue.length>1){
      setIsMenuOpen(true)
    }
    
  }

  // error ------------------
  const [characterValidateText,setCharacterValidateText] = useState<string>("")
  const array:number[] = []
  
  console.log(childFunc01)
  console.log(characterPlot)
  const handleErrorCheck = () =>{
    console.log(characterIdList)
    if(characterIdList.length == 0){

      setCharacterValidateText("選択されていません。")
      return
    }


    console.log(childFunc01)
    const array:number[] = []
    childFunc01.current.map((i:Function,index:number)=>
    array.push(childFunc01.current[index].func())
    // childFunc01.current[index]()
    )
    console.log(array)

    let total = array.reduce(function(sum, element){
      return sum + element;
    }, 0);

    console.log(total)
    if(total>0){
      return
    }


    // console.log(total,"a")
    Props.setCharacterMiddleData(characterPlot)
    // console.log(childFunc01.current[0]())
    // console.log(childFunc01)
    // console.log(characterPlot)
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();

  }

  // 2役以上
    const handleMoreCharacter = (item:selectOption) => {
      // console.log("aaaaaaaaaaaaaaaaaaaa")
      // console.log(item)
      // const copy = characterIdList
      // characterIdList.push(item)
      setCharacterIdList2([...characterIdList2,item])
    }

  Props.childFunc3.current = handleErrorCheck

  

// console.log(character)
// character -------------------
// const handleChangeCharacterName = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,index:number,castId:string) => {
//   console.log(index,e,castId)
//   setCharacterPlot([characterPlot[index],{characterName:e?.target.value as string,castId}])
// }

  console.log(characterIdList2)
  return(
    <>
    {Props.completed[2]!=true?
      <div className = "Stepper3" style={Props.activeStep!=2?{display:"none"}:undefined}>
        {/* <div
        onClick={()=>ota1("aa",0)}
        >1</div>
        <p></p>
        <p></p>

        <div
        onClick={()=>ota1("ii",1)}
        >2</div>
        <p></p>
        <p></p>

        <div
        onClick={()=>ota1("uu",1)}
        >3</div>
        <p></p>
        <p></p> */}

        <div className = {`FormProductList2Message ${onMessage == true?"activeFormProductList2Message":""}`}>
          {message}
          {/* {count} */}
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
          // components={animatedComponents}
          onChange={handleSelectChangeCharacter}
          styles={{ menu: (provided, state) => ({ ...provided, zIndex: 10 }) }}
          // onInputChange={inputValue =>
          //   (inputValue.length <= 1 ? inputValue : inputValue.substr(0, 1))
          // }
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
          // helperText={inputRef?.current?.validationMessage}
          helperText={addCharacterValidateText}
          onChange={handleChangeAddCharacter}
          size="small"
          fullWidth
        />
        <Button variant="contained"
            // className = "TheredModalButton"
            onClick = { handleSubmitCharacter }
          >
          Add
        </Button>
        </div>
        {/* -------------------------------------------------------- */}

        {/* <div className = "FormProductList2Genres">
          Genres
        </div>
        <Select
          // inputValue={pokemon}
          placeholder={"Genres select..."}
          options={genres} 
          closeMenuOnSelect={false}
          isMulti
          value={genresIdList}
          // components={animatedComponents}
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
            // helperText={inputRef?.current?.validationMessage}
            helperText={addGenreValidateText}
            onChange={handleChangeAddGenre}
            size="small"
            fullWidth
          />
          <Button variant="contained"
              className = "TheredModalButton"
              onClick = { handleSubmitGenres }
            >
            Submit
          </Button>
          </div> */}
        <div className = "FormProductList2Genres">
          Character
        </div>
          {/* 2 */}
          {characterIdList2.map((item,index)=>{
          return(
            <CharacterEdit
              item={item}
              key={index}
              setCharacterPlot = {setCharacterPlot}
              characterPlot = {characterPlot} 
              index={index}
              
              // childFunc01={ childFunc01.current[index]}
              childFunc01={ childFunc01}
              

              // ref={childFunc01}
              array={array}

              handleMoreCharacter={handleMoreCharacter}
            />
          )
        })}
        {/* {characterIdList2.map((item,index)=>{
          return(
            <CharactersFormList
              item={item}
              key={item.value}
              setCharacterPlot = {setCharacterPlot}
              characterPlot = {characterPlot} 
              index={index}
              
              // childFunc01={ childFunc01.current[index]}
              childFunc01={ childFunc01}
              

              // ref={childFunc01}
              array={array}

              handleMoreCharacter={handleMoreCharacter}
            />
          )
        })} */}


      </div>
      :<></>
      }
    </>
  )
}