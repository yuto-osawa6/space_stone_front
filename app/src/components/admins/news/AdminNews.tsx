import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material"
import { execNewsCreate } from "@/lib/api/admin/news"
import { useState } from "react"
// import { useNavigate } from "react-router-dom"

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}



export const AdminNews:React.FC<Props> = (Props) => {
  const [open,setOpen] = useState<boolean>(true)
  // const navigate = useNavigate()
  const handleClose = () => {
    Props.setOpen(false)

    // navigate("/admins")
  }
  // juge------------
  const [value,setValue] = useState<string>("")
  const [valueError,setValueError] = useState<boolean>()
  const [valueValidateText,setValueValidateText] = useState<string>()
  // const [valueValidationText] = useState<string>("")
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
      setTitleEroor(true)
      setTitleValidateText("入力されていません")
      count += 1
    }
    if (title==undefined) return
    if (title2==undefined) return

    if( count >0) return 
    const res = await execNewsCreate(value,title,title2)
    if(res.status === 200){
      console.log(res)
    }else{

    }
    
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
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  // error={yearError}
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
                  // defaultValue=""
                  // defaultValue={Props.product.title}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  // helperText={inputRef?.current?.validationMessage}
                  helperText={titleValidateText}
                  onChange={handleChangeTitle}
                  size="small"
                  fullWidth
                  // disabled={true}
                />
                <TextField
                  error={title2Error}
                  inputProps={{ maxLength: 40, pattern: "^[a-zA-Z0-9_]+$" }}
                  placeholder="タイトルを入力してください（必須:40文字以内）"
                  // defaultValue=""
                  // defaultValue={Props.product.title}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  // helperText={inputRef?.current?.validationMessage}
                  helperText={title2ValidateText}
                  onChange={handleChangeTitle2}
                  size="small"
                  fullWidth
                  // disabled={true}
                />

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