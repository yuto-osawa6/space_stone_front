import { Button, MenuItem, SelectChangeEvent, TextField,Select as SelectMaterial } from "@mui/material";
// import { Select as SelectMaterial} fo
import { genre } from "interfaces/product";
import { execCreateCharacter, execGetCharacterList } from "lib/api/admin/character";
import { execCreateFormat, execGetFormatsList } from "lib/api/admin/formats";
import { execCreateGenreLib, execGetGenresList } from "lib/api/admin/janls";
import { execCreateStaffLib, execGetStaffList } from "lib/api/admin/staff";
import { execCreateStudiosLib, execGetStudiosList } from "lib/api/admin/studios";
import { useEffect, useRef, useState } from "react";
// import Select from "react-select/dist/declarations/src/Select";
import Select, { InputActionMeta } from 'react-select'
import { CharactersFormList } from "./CharactersFormList";
import { EpisordItems } from "./EpisordItems";
import { StaffRollsFormList } from "./StaffRollsFormList";

type Props = {
  activeStep:number

  childFunc5: React.MutableRefObject<any>
  completed: {[k: number]: boolean;}
  setCompleted:React.Dispatch<React.SetStateAction<{[k: number]: boolean;}>>
  handleNext: () => void

  episord:episord[]
  setEpisord: React.Dispatch<React.SetStateAction<episord[]>>
}

type episord = {
  episordNumber:number
  episordTittle:string
  episordArasuzi:string
  episordImageUrl:string
  episordTime:Date | null
  episordReleaseDate:Date | null
}
export const ProductFormList5:React.FC<Props> = (Props) => {
  const childFunc01 = useRef<any>([])
  // const []
  const [episordNumber,setEpisordNumber] = useState<string>()
  const [episordError,setEpisordError] = useState<boolean>(false)
  const [episordValidateText,setEpisordValidateText] = useState<string>("")

  const [episordArray,setEpisordArray] = useState<number[]>([])

  // const [episord,setEpisord] = useState<episord[]>([])


  const handleChangeEpisord = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    // console.log(e?.target.value.replace(/[^0-9]/g, ''))
    setEpisordValidateText("")
    setEpisordNumber(e?.target.value.replace(/[^0-9]/g, '') as string)
  }
  console.log(episordNumber)

  const  handleSubmitEpisord  = () => {
    console.log(episordNumber)
    if(episordNumber==undefined||episordNumber.length==0){
      setEpisordError(true)
      setEpisordValidateText("話数の入力に誤りがあります。")
      return
    }
    if(Number(episordNumber)>120){
      setEpisordError(true)
      setEpisordValidateText("話数の入力に誤りがあります。")
      return
    }
    setEpisordError(false)
    setEpisordValidateText("")

    const array:any[] = []
    for (let i = 0; i < Number(episordNumber); ++i) {
      // console.log(arr[i]);
      array.push(i)
    }
    console.log(array)
    setEpisordArray(array)

    Props.setEpisord(Props.episord.filter(item => array.includes((item.episordNumber-1))))
    childFunc01.current = childFunc01.current.filter((item:any) => array.includes(item.index))
    
  }
  // console.log(episord)

  // ----------------------------------------

  const array:number[] = []
  const handleErrorCheck = () => {
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
    const newCompleted = Props.completed
    newCompleted[Props.activeStep] = true
    Props.setCompleted(newCompleted)
    Props.handleNext();
    
  }


  Props.childFunc5.current = handleErrorCheck

  return(
    <>
    {Props.completed[4]!=true?
      <div className = "Stepper5" style={Props.activeStep!=4?{display:"none"}:undefined}>

        {/* <div className = "FormProductList2AddGenreFlexBox">
          *数字のみ */}
          <TextField
            error={episordError}
            inputProps={{ maxLength: 3, pattern: "[0-9_]+$" }}
            placeholder="話数を入力してください(max120話）"
            defaultValue=""
            id="outlined-basic"
            label="話数"
            variant="outlined"
            // helperText={inputRef?.current?.validationMessage}
            helperText={episordValidateText}
            onChange={handleChangeEpisord}
            size="small"
            fullWidth
          />
          <Button variant="contained"
              // className = "TheredModalButton"
              onClick = { handleSubmitEpisord }
            >
            決定
          </Button>

          {episordArray.map((item,index)=>{
            return(
              <EpisordItems
              key={item}
              index={index}
              array_number = {item}
              episord={Props.episord}
              setEpisord={Props.setEpisord}

              childFunc01={childFunc01}
              array={array}
              />
            )
          })}
        </div>
      // </div>
      :<></>}
    </>
  )
}