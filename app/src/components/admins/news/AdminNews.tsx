import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { execNewsCreate } from "@/lib/api/admin/news"
import { useMemo, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { pussingMessageDataAction } from "@/store/message/actions"
import { ErrorMessage } from "@/lib/ini/message"
import { DateTimePicker, LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;


type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdminNews:React.FC<Props> = (Props) => {
  const [open,setOpen] = useState<boolean>(true)
  const handleClose = () => {
    Props.setOpen(false)
  }
  // juge------------
  const [value,setValue] = useState<string>("")
  const [valueError,setValueError] = useState<boolean>()
  const [valueValidateText,setValueValidateText] = useState<string>()
  const handleChangeValue = (e:SelectChangeEvent) => {
    setValue(e.target.value as string)
    setValueValidateText("")
    setValueError(false)
  }

  // title-----------------
  const [title,setTitle] = useState<string | undefined>("")
  const [titleError,setTitleEroor] = useState<boolean>()
  const [titleValidateText,setTitleValidateText] = useState<string>()
  const handleChangeTitle = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setTitle(e?.currentTarget.value)
    setTitleEroor(false)
    setTitleValidateText("")
  }

  // description
  const [title2,setTitle2] = useState<string | undefined>("")
  const [title2Error,setTitle2Eroor] = useState<boolean>()
  const [title2ValidateText,setTitle2ValidateText] = useState<string>()
  const handleChangeTitle2 = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setTitle2(e?.currentTarget.value)
    setTitle2Eroor(false)
    setTitle2ValidateText("")
  }

  // infomation
  const [info,setInfo] = useState<string>("")
  const quillref  = useRef<any>(null!)
  const handleChange = (content: string):void | undefined => {
    setInfo(content)
  }

  const modules =  useMemo(() => (
    {
    toolbar:{ 
      container:[
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote"],
      ["code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ['link'],   
    ],
    handlers: {
      },
    },
  }
  ),[]);
  

  const dispatch = useDispatch()

  const handleSubmitNews = async() => {
    let count = 0
    if(value==""){
      setValueValidateText("選択されていません")
      setValueError(true)
      count += 1
    }
    if(title?.length==0){
      setTitleEroor(true)
      setTitleValidateText("入力されていません")
      count += 1
    }
    if(title2?.length==0){
      setTitle2Eroor(true)
      setTitle2ValidateText("入力されていません")
      count += 1
    }
    const jugde_date = isInvalidDate(deliveryStart)
    // console.log(jugde_date)
    if (jugde_date == true){
      setDeliveryStartValidationText("正しい入力をしてください")
      count += 1
    }
    // if()
    if (title==undefined) return
    if (title2==undefined) return
    if (deliveryStart == null) return

    
    if( count >0) return 
    const res = await execNewsCreate(value,title,title2,info,deliveryStart)
    if(res.data.status === 200){
      dispatch(pussingMessageDataAction({title:"Newを追加しました。",select:1}))
    }else{
      dispatch(pussingMessageDataAction({title:ErrorMessage.message,select:0}))
    }
    
  }
  // date 
  const handlererror = () => {
    setError(true)
  }
  const [deliveryStart, setDeliveryStart] = useState<Date | null>(null);
  const [deliveryStartValidationText,setDeliveryStartValidationText] = useState<string>("")
  const [deliveryEndValidationText,setError] = useState<boolean>(false)

  const isInvalidDate = (date: Date | null):boolean => {
    if(date==null){
      return true
    }
    return Number.isNaN(date.getTime())
  }

  return(
    <>
      <Modal
        open={Props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className = "AdminsProduct">
            <div className = "FormProduct">
              <div className = "FormProductSetTitle">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label="Year"
                  onChange={handleChangeValue}
                  size="small"
                  error={valueError}
                >
                    <MenuItem value={1} >アニメ</MenuItem>
                    <MenuItem value={2} >記事</MenuItem>
                    <MenuItem value={3} >更新</MenuItem>
                </Select>
              <FormHelperText className = "helpertexts">{valueValidateText}</FormHelperText>
              </FormControl>
                <TextField
                  error={titleError}
                  inputProps={{ maxLength: 40, pattern: "^[a-zA-Z0-9_]+$" }}
                  placeholder="タイトルを入力してください（必須:40文字以内）"
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  helperText={titleValidateText}
                  onChange={handleChangeTitle}
                  size="small"
                  fullWidth
                />
                <TextField
                  error={title2Error}
                  inputProps={{ maxLength: 40, pattern: "^[a-zA-Z0-9_]+$" }}
                  placeholder="概要を入力してください（必須:40文字以内）"
                  id="outlined-basic"
                  label="description"
                  variant="outlined"
                  helperText={title2ValidateText}
                  onChange={handleChangeTitle2}
                  size="small"
                  fullWidth
                />
                <ReactQuill 
                  className = "reviews_modal_quill"
                  ref={quillref}
                  modules={modules} value={info} onChange={handleChange}  
                  theme="snow"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker             
                  label="配信開始"
                  onError={handlererror}
                  value={deliveryStart}
                  onChange={(newValue) => {
                    setDeliveryStart(newValue)
                    setDeliveryStartValidationText("")
                  }}
                  renderInput={(params) => 
                    <TextField 
                      {...params}
                    />}
                  />
                </LocalizationProvider>
                <FormHelperText className = "helpertexts">{deliveryStartValidationText}</FormHelperText>
                <Button variant="contained"
                  onClick = { handleSubmitNews }
                  >
                  Submit
                </Button>
              
              </div>
            </div>
          </div>

        </>
      </Modal>

    </>
  )
}