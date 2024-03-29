import { useState } from "react"
import { Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider, TimePicker } from "@mui/lab"
import { FormHelperText, Modal, TextField } from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { useDispatch } from "react-redux";
import { pussingMessageDataAction } from "@/store/message/actions";
import { execDeleteEpisord, execUpdateEpisord } from "@/lib/api/episord";
import { useRouter } from "next/router";
type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const CreateEpisord:React.FC<Props> = function CreateEpisordFunc(Props){
  const [episordNumber,setEpisordNumber] = useState<number>(0)
  const [episordNumberHelper,setEpisordNumberHelper] = useState<string>("")
    const handleClose = () => {
    Props.setOpen(false)
  }
  const handleChangeEpisordNumber = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setEpisordNumberHelper("")
    setEpisordNumber(Number(e?.target.value.replace(/[^0-9]/g, '')))
  }
  // --------------------------------
  const [episordTitle,setEpisordTitle] = useState<string>("")
  const [episordTitleHelper,setEpisordTitleHelper] = useState<string>("")
  const handleChangeEpisordTitle = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setEpisordTitle(e?.target.value as string)
    setEpisordTitleHelper("")
  }
  // ----------
  const [time, setTime] = useState<Date | null>(null);
  const [timeValidationText,setTimeValidationText] = useState<string>("")
  const isInvalidDate = (date: Date | null):boolean => {    
    if(date==null){
      return true
    }
    return Number.isNaN(date.getTime())
  }
  // release---------------
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [releaseDateValidationText,setReleaseDateValidationText] = useState<string>("")
  let count = 0
  const dispatch = useDispatch()
  const router = useRouter()
  const {pid} = router.query
  const handleSubmitEpisord = async() => {
    if(episordNumber == 0){
      setEpisordNumberHelper("適切な形で入力してください。")
      count += 1
    }
    if(time!=null){
      if(isInvalidDate(time)){
        setTimeValidationText("適切な形で入力してください。")
        count += 1
      }
    }
    if(time!=null){
      if(isInvalidDate(releaseDate)){
        setReleaseDateValidationText("適切な形で入力してください。")
        count += 1
      }
    }
    if(count>0){
      return
    }else{
      // console.log(releaseDate)
      const res = await execUpdateEpisord(pid as string,episordNumber,episordTitle,time,releaseDate)
      if(res.data.status == 200){
        dispatch(pussingMessageDataAction({title:res.data.message,select:1}))
      }else{
        dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
      }
    }

  }
  const handleSubmitDeleteEpisord = async() => {
    if(episordNumber == 0){
      setEpisordNumberHelper("適切な形で入力してください。")
      count += 1
    }
    if(count>0){
      return
    }else{
      const res = await execDeleteEpisord(pid as string,episordNumber)
      if(res.data.status == 200){
        dispatch(pussingMessageDataAction({title:res.data.message,select:2}))
      }else{
        dispatch(pussingMessageDataAction({title:"予期しないエラーが発生しました。もう一度試すか、お問い合わせください。",select:0}))
      }
    }
  }

  return (
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
                  episord:{episordNumber}
                  <TextField
                    inputProps={{ maxLength: 100, pattern: "^[0-9_]+$" }}
                    placeholder="更新・削除するepisordを入力してください"
                    defaultValue=""
                    id="outlined-basic"
                    label="episord"
                    variant="outlined"
                    onChange={handleChangeEpisordNumber}
                    fullWidth
                  />
                  <FormHelperText className = "helpertexts">{episordNumberHelper}</FormHelperText>
                  <TextField
                    inputProps={{ maxLength: 100, pattern: "^[0-9_]+$" }}
                    placeholder="episord Titleを入力してください"
                    defaultValue=""
                    id="outlined-basic"
                    label="episord Title"
                    variant="outlined"
                    onChange={handleChangeEpisordTitle}
                    fullWidth
                  />
                  <FormHelperText className = "helpertexts">{episordTitleHelper}</FormHelperText>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                      setTimeValidationText("")
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  /> 
                  </LocalizationProvider>
                  <FormHelperText className = "helpertexts">{timeValidationText}</FormHelperText>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="配信開始(最短)"
                    value={releaseDate}
                    onChange={(newValue) => {
                      setReleaseDate(newValue);
                      setReleaseDateValidationText("")
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </LocalizationProvider>
                  <FormHelperText className = "helpertexts">{releaseDateValidationText}</FormHelperText>
                  
                  <div className=""
                  style={{
                    display:"flex",
                    justifyContent:"space-between"
                  }}
                  >
                    <Button variant="contained"
                      onClick = { handleSubmitEpisord }
                    >
                      決定
                    </Button>
                    <Button variant="contained"
                      onClick = { handleSubmitDeleteEpisord }
                    >
                      削除
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  )
}