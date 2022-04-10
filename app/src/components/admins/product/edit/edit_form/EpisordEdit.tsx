import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { FormHelperText, TextField } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react"
// import ReactQuill, { Quill } from "react-quill"
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type episord = {
  episordNumber:number
  episordTittle:string
  episordArasuzi:string
  episordImageUrl:string
  episordTime:Date | null
  episordReleaseDate:Date | null
}

type Props = {
  index:number
  array_number:number
  episord:episord[]
  setEpisord: React.Dispatch<React.SetStateAction<episord[]>>

  childFunc01:React.MutableRefObject<any>
  array: number[]
}

export const EpisordEdit:React.FC<Props> = (Props) => {
  const quillref  = useRef<any>(null)
  const [valueArasuzi,setValueArasuzi] = useState<string>(Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordArasuzi:"")
  const modules =  useMemo(() => (
    {
    toolbar:{ 
      container:[
      // [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      // [{ script:  "sub" }, { script:  "super" }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      // ["link", "image", "video"],
      ['netflix'],
      ['boxcontents'],   
    ],
    handlers: {
    },
    },
  }
  ),[]);
  const [episordItem,setEpisordItem] = useState<episord>({ 
    // episordNumber:0,
    // episordTittle:"",
    // episordArasuzi:"",
    // episordImageUrl:"",
    // episordTime:null,
    // episordReleaseDate:null
    episordNumber:Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordNumber:0,
    episordTittle:Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordTittle:"",
    episordArasuzi:Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordArasuzi:"",
    episordImageUrl:Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordImageUrl:"",
    episordTime:Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordTime:null,
    episordReleaseDate:Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordReleaseDate:null
  })
  // title
  const [Error,setError] = useState<boolean>(false)
  const [title,setTilte] = useState<string>(Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordTittle:"")
  const handleChangeEpisordTitle = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const value = e?.target.value as string
    setTilte(value)
    setEpisordItem({
      episordNumber:Props.index+1,
      episordTittle:value,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:episordItem.episordTime,
      episordReleaseDate:episordItem.episordReleaseDate
    })

    const copy = Props.episord.slice()
    // const value = e?.target.value as string
    copy[Props.index]={
      episordNumber:Props.index+1,
      episordTittle:value,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:episordItem.episordTime,
      episordReleaseDate:episordItem.episordReleaseDate
    }
    Props.setEpisord(copy)
  }
  // imageUrl
  const [Error2,setError2] = useState<boolean>(false)
  const [imageUrl,setImageUrl] = useState<string>(Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordImageUrl:"")
  const handleChangeEpisordImageUrl = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const value = e?.target.value as string
    setImageUrl(value)
    setEpisordItem({
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:value,
      episordTime:episordItem.episordTime,
      episordReleaseDate:episordItem.episordReleaseDate
    })

    const copy = Props.episord.slice()
    // const value = e?.target.value as string
    copy[Props.index]={
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:value,
      episordTime:episordItem.episordTime,
      episordReleaseDate:episordItem.episordReleaseDate
    }
    Props.setEpisord(copy)
  }

  // arasuzi
  const [arasuziValidationText,setArasuziValidationText] = useState<string>("")
  const handleChangeEpisordArasuzi = (content: string):void | undefined=> {
    setValueArasuzi(content)
    setEpisordItem({
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:content,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:episordItem.episordTime,
      episordReleaseDate:episordItem.episordReleaseDate
    })

    const copy = Props.episord.slice()
    // const value = e?.target.value as string
    copy[Props.index]={
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:content,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:episordItem.episordTime,
      episordReleaseDate:episordItem.episordReleaseDate
    }
    Props.setEpisord(copy)

  }
  // time
  console.log(Props.episord[Props.index])
  const [time, setTime] = useState<Date | null>(Props.episord[Props.index]!=undefined&&Props.episord[Props.index].episordTime!=null?new Date(Props.episord[Props.index].episordTime as Date):null);
  const [timeValidationText,setTimeValidationText] = useState<string>("")

  // const [deliveryStart, setDeliveryStart] = useState<Date | null>(null);

  useEffect(()=>{
    handleSetUpTime()
  },[time])

  const handleSetUpTime= ()=> {
    setEpisordItem({
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:time,
      episordReleaseDate:episordItem.episordReleaseDate
    })

    const copy = Props.episord.slice()
    // const value = e?.target.value as string
    copy[Props.index]={
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:time,
      episordReleaseDate:releaseDate
    }
    Props.setEpisord(copy)

  }

  // release
  const [releaseDate, setReleaseDate] = useState<Date | null>(Props.episord[Props.index]!=undefined&&Props.episord[Props.index].episordReleaseDate!=undefined?new Date(Props.episord[Props.index].episordReleaseDate as Date):null);
  const [releaseDateValidationText,setReleaseDateValidationText] = useState<string>("")
  // const [deliveryStart, setDeliveryStart] = useState<Date | null>(null);

  useEffect(()=>{
    handleSetUpReleateDate()
  },[releaseDate])

  const handleSetUpReleateDate = ()=> {
    setEpisordItem({
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:episordItem.episordTime,
      episordReleaseDate:releaseDate
    })

    const copy = Props.episord.slice()
    // const value = e?.target.value as string
    copy[Props.index]={
      episordNumber:Props.index+1,
      episordTittle:episordItem.episordTittle,
      episordArasuzi:episordItem.episordArasuzi,
      episordImageUrl:episordItem.episordImageUrl,
      episordTime:episordItem.episordTime,
      episordReleaseDate:releaseDate
    }
    Props.setEpisord(copy)

  }

  const isInvalidDate = (date: Date | null):boolean => {
    if(date==null){
      return true
    }
    return Number.isNaN(date.getTime())
  }
  // -------------------------------
  const handleError = ():number => {
    console.log("aaa")
    let count = 0
    // if(title==undefined){
    //   setError(true)
    //   count += 1
    // }
    // if(title!=undefined&&title.length==0){
    //   setError(true)
    //   count += 1
    // }
    // if(imageUrl.length==0){
    //   setError2(true)
    //   count += 1
    // }

    const blob = new Blob([valueArasuzi])
    const editor = quillref.current?.getEditor()
    // if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length>300){
    //   setArasuziValidationText("300文字までです。")
    //   count += 1
    // }
    // else if(editor.getText().replace(/\r?\n/g, '').replace(/\s+/g, "").length==0){
    //   setArasuziValidationText("入力されていません。")
    //   count += 1
    // }
    // if(blob.size>3000){
    //   console.log(new Blob([valueArasuzi.replace(/(\s+){2,}/g," ").replace(/(<p>\s+<\/p>){1,}/g,"<p><br></p>").replace(/(<p><\/p>){1,}/g,"<p><br></p>").replace(/(<p><br><\/p>){2,}/g,"<p><br></p>")]).size)
    //   setArasuziValidationText("サイズが大きすぎます。")
    //   count += 1
    // }
    // if(isInvalidDate(time)){
    //   setTimeValidationText("適切な形で入力してください。")
    //   count += 1
    // }
    // if(isInvalidDate(releaseDate)){
    //   setReleaseDateValidationText("適切な形で入力してください。")
    //   count += 1
    // }


    Props.array.push(count)
    return count
  
  }
  
  
    Props.childFunc01.current[Props.index] = {index:Props.index,func:handleError}
    // id:Props.item.value
    console.log(Props.episord[Props.index])
    console.log(Props.index)
    console.log(Props.episord)
    console.log(Props)

    // console.log(Props.episord[Props.index].episordReleaseDate!=undefined)


    // console.log(Props)



  return(
    <>
      {Props.index+1}話
      {/* {Props.array_number} */}
      <TextField
        error={Error}
        inputProps={{ maxLength: 100, pattern: "^[0-9_]+$" }}
        placeholder="episord Titleを入力してください(30文字以内）"
        defaultValue={Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordTittle:""}
        id="outlined-basic"
        label="episord Title"
        variant="outlined"
        // helperText={inputRef?.current?.validationMessage}
        // helperText={episordValidateText}
        onChange={handleChangeEpisordTitle}
        size="small"
        fullWidth
      />
       {/* <TextField
        error={Error2}
        // error={episordError}
        inputProps={{ maxLength: 2000, pattern: "^[0-9_]+$" }}
        placeholder="Episord ImageUrlを入力してください(30文字以内）"
        defaultValue={Props.episord[Props.index]!=undefined?Props.episord[Props.index].episordImageUrl:""}
        id="outlined-basic"
        label="episord ImageUrl"
        variant="outlined"
        // helperText={inputRef?.current?.validationMessage}
        // helperText={episordValidateText}
        onChange={handleChangeEpisordImageUrl}
        size="small"
        fullWidth
      /> */}
      
      {/* <ReactQuill 
        className = "adminProductDescriptionQuill"
        ref={quillref}
        modules={modules} value={valueArasuzi} onChange={handleChangeEpisordArasuzi}  
        theme="snow"
        placeholder="あらすじ(200文字以内)"
      />
      <FormHelperText className = "helpertexts">{arasuziValidationText}</FormHelperText> */}
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <Stack spacing={3}> */}
        <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="With seconds"
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> 
        {/* </Stack> */}
        </LocalizationProvider>
        <FormHelperText className = "helpertexts">{timeValidationText}</FormHelperText>
      
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="配信開始"
          // type="datetime-local"
          value={releaseDate}
          onChange={(newValue) => {
            setReleaseDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        <FormHelperText className = "helpertexts">{releaseDateValidationText}</FormHelperText>

       

     
    </>
  )
}